# Product Requirements Document: Studio Ghibli GraphQL API

## Introduction/Overview

This feature creates a GraphQL API backend that integrates with the Studio Ghibli REST API to provide a modern, typed interface for the frontend application. The GraphQL server will transform REST data into a clean, consistent schema with proper field mapping, caching, and error handling.

**Problem Solved:** The current backend lacks Studio Ghibli film data integration. The frontend needs a reliable, fast way to fetch individual films and filtered film lists with consistent data types and error handling.

**Goal:** Implement a production-ready GraphQL API that serves as a backend for the Studio Ghibli frontend application, providing optimized data fetching with caching and robust error handling.

## Goals

1. **Primary API Integration**: Connect to Studio Ghibli REST API endpoints with proper error handling and retries
2. **GraphQL Schema Implementation**: Provide clean, typed GraphQL queries with field transformation
3. **Performance Optimization**: Implement in-memory caching with 5-minute TTL to reduce external API calls
4. **Data Reliability**: Transform string fields to appropriate types (numbers, dates) with validation
5. **Developer Experience**: Ensure frontend codegen compatibility and clear error messages
6. **Production Readiness**: Include health checks and comprehensive testing

## User Stories

**As a frontend developer**, I want to query individual films by ID so that I can display detailed film information with consistent data types.

**As a frontend developer**, I want to query all films except specific ones so that I can implement a "show me something different" feature efficiently.

**As a system administrator**, I want health check endpoints so that I can monitor the API's availability and integration status.

**As an application user**, I want fast response times so that film data loads quickly even when the external API is slow.

**As a developer**, I want clear error messages so that I can understand and handle API failures gracefully.

## Functional Requirements

### Core GraphQL Queries

1. **The system must provide a `film(id: ID!)` query** that returns a single Film object or null if not found
2. **The system must provide a `filmsExcept(ids: [ID!]!)` query** that returns all films excluding the specified IDs
3. **The system must transform REST field names to camelCase** (release_date → releaseDate, running_time → runningTime, rt_score → rtScore, movie_banner → movieBanner)
4. **The system must convert string numbers to proper integer types** for runningTime and rtScore fields
5. **The system must handle null/missing image fields gracefully** by allowing null values for image and movieBanner

### API Integration

6. **The system must integrate with `https://ghibliapi.vercel.app/films/{id}`** for individual film queries
7. **The system must integrate with `https://ghibliapi.vercel.app/films`** for bulk film data
8. **The system must implement 5-second timeout** for all external API calls
9. **The system must retry failed requests once** with exponential backoff
10. **The system must log detailed errors server-side** while returning clean GraphQL errors to clients

### Caching & Performance

11. **The system must implement in-memory caching** with 5-minute TTL using keys like `film:{id}` and `films:all`
12. **The system must automatically clear cache** on server restart
13. **The system must serve cached responses** when available to improve performance

### Endpoints & Health

14. **The system must expose GraphQL endpoint at `/graphql`** accepting POST requests
15. **The system must provide health check endpoint at `/healthz`** returning "Ok" for GET requests
16. **The system must be compatible with frontend GraphQL codegen** tools

### Data Validation

17. **The system must validate that runningTime and rtScore are non-negative integers**
18. **The system must validate that image and movieBanner URLs are properly formatted** when present
19. **The system must handle missing or malformed data** from the external API gracefully

## Non-Goals (Out of Scope)

- **Film Mutations**: No create, update, or delete operations for films
- **User Authentication**: No user management or access control
- **Advanced Caching**: No Redis or external cache systems
- **Real-time Updates**: No subscriptions or live data updates
- **Data Persistence**: No database storage, purely API proxy
- **Admin Interface**: No administrative UI for cache management
- **Rate Limiting**: No request throttling or usage quotas
- **General `films()` Query**: Stretch goal only, not in initial scope

## Design Considerations

### GraphQL Schema Structure

```graphql
type Film {
  id: ID!
  title: String!
  description: String!
  director: String!
  releaseDate: String!
  runningTime: Int!
  rtScore: Int!
  image: String
  movieBanner: String
}

type Query {
  film(id: ID!): Film
  filmsExcept(ids: [ID!]!): [Film!]!
}
```

### Error Response Format

- Use GraphQL extensions with error codes (e.g., `BAD_GATEWAY`, `NOT_FOUND`)
- Provide user-friendly error messages
- Log detailed technical errors server-side only

### Cache Key Strategy

- Individual films: `film:{id}`
- All films data: `films:all`
- TTL: 5 minutes for all cached entries

## Technical Considerations

### Dependencies

- **Existing Infrastructure**: Build on current Apollo GraphQL Server v4 setup
- **HTTP Service Integration**: Utilize existing HTTP service class in `src/services/Http/`
- **Nexus Schema**: Extend current Nexus-based schema generation
- **TypeScript**: Maintain full type safety throughout the implementation

### API Response Mapping

```javascript
// REST API Response → GraphQL Field Mapping
{
  "id": "id",                    // string → ID!
  "title": "title",              // string → String!
  "description": "description",   // string → String!
  "director": "director",        // string → String!
  "release_date": "releaseDate", // string → String!
  "running_time": "runningTime", // string → Int! (parsed)
  "rt_score": "rtScore",         // string → Int! (parsed)
  "image": "image",              // string → String?
  "movie_banner": "movieBanner"  // string → String?
}
```

### Error Handling Strategy

1. **Network Timeouts**: Return GraphQL error with `NETWORK_ERROR` code
2. **API 404**: Return null for single film, exclude from array for multiple films
3. **API 5xx**: Return GraphQL error with `BAD_GATEWAY` code
4. **Invalid Data**: Log warning, return partial data with defaults where possible
5. **Cache Failures**: Fall through to API calls, log cache errors

## Success Metrics

### Functional Success

- `film(id)` query returns properly mapped Film objects with numbers as integers
- `filmsExcept(ids)` query excludes specified IDs and returns remaining films
- `/graphql` endpoint responds to POST requests successfully
- `/healthz` endpoint returns "Ok" status
- Frontend GraphQL codegen generates types without errors

### Performance Success

- API response times under 200ms for cached requests
- API response times under 2 seconds for uncached requests
- Cache hit ratio above 70% during normal usage
- Zero failed requests due to timeout with retry logic

### Quality Success

- Unit test coverage above 80% for mapping and validation logic
- Integration tests pass for both successful and error scenarios
- All external API calls properly mocked in test environment
- Error messages are clear and actionable for frontend developers

## Open Questions

1. **Film ID Format**: Should we validate that film IDs follow the expected Studio Ghibli API format?
2. **Cache Memory Limits**: Should we implement cache size limits to prevent memory issues?
3. **Monitoring**: Do we need metrics/logging integration beyond basic error logging?
4. **Stretch Goal Timeline**: When should the optional `films()` query be implemented?

---

**Target Audience**: Junior Developer  
**Implementation Priority**: High  
**Estimated Complexity**: Medium  
**Dependencies**: Current Apollo GraphQL setup, HTTP service class
