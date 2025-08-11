# PRD: Four Film Buttons Display Feature

## Introduction/Overview

This feature provides an interactive interface for users to explore Studio Ghibli films through a set of four clickable buttons. Each button represents a specific film and when clicked, initiates a data fetching process (currently mocked with a 3-second timer) to retrieve film information. The buttons provide visual feedback through different states and transform to display the fetched film's poster image upon successful data retrieval.

**Goal**: Create an intuitive, responsive button interface that allows users to discover Studio Ghibli films with clear visual feedback during data loading and error states.

## Goals

1. **User Engagement**: Provide an interactive way for users to explore Studio Ghibli films
2. **Visual Feedback**: Clear indication of button states (default, hover, loading, disabled, success)
3. **Responsive Design**: Buttons adapt to different screen sizes (4→2→1 per row)
4. **Error Handling**: Graceful handling of failed requests with retry mechanism
5. **Accessibility**: Proper button states and loading indicators for screen readers

## User Stories

- **As a Studio Ghibli fan**, I want to see four distinct film buttons so that I can choose which film to explore
- **As a user**, I want to see visual feedback when I click a button so that I know my action was registered
- **As a user**, I want to see a loading indicator when data is being fetched so that I understand something is happening
- **As a mobile user**, I want the buttons to stack vertically so that they're easy to tap on my device
- **As a user**, I want to be notified if something goes wrong so that I can try again
- **As a user**, I want to see the film's poster image on the button after successful loading so that I have visual confirmation

## Functional Requirements

1. **Development Environment Setup**: The system must be properly set up with working frontend and backend development servers before implementing button components
2. **Button States Management**: The system must implement a ButtonState enum with values: DEFAULT, HOVER, LOADING, DISABLED, SUCCESS
3. **Button Layout**: The system must display buttons in a responsive flex layout:
   - Desktop: 4 buttons per row
   - Tablet: 2 buttons per row
   - Mobile: 1 button per row
4. **Individual Loading States**: The system must only show loading state on the specific button being clicked, keeping other buttons interactive
5. **Loading Component**: The system must use a MUI loading spinner component during the loading state
6. **Button Styling**: The system must style buttons as rectangular MUI Card components with specific colors:
   - Button 1: #d79a68
   - Button 2: #c24646
   - Button 3: #279094
   - Button 4: #3e6cac
7. **Loading Visual Effect**: The system must apply CSS blur effect to buttons during loading state
8. **Mock Data Fetching**: The system must simulate data fetching with a 3-second timer using useEffect
9. **Success State**: The system must replace button background color with fetched film poster image upon successful data retrieval
10. **Error Handling**: The system must retry failed requests up to 3 times before showing error
11. **Error Notification**: The system must display MUI Snackbar with "Failed to fetch film data" message on final failure
12. **Error Recovery**: The system must reset button state after error to allow user retry
13. **Data Structure**: The system must handle film data objects containing: id, title, original_title, original_title_romanised, description, director, producer, release_date, running_time, rt_score, people, species, locations, vehicles, url
14. **Component Props**: The system must accept film data as props from parent component (component agnostic design)
15. **State Management**: The system must store successful film data in useState hook

## Non-Goals (Out of Scope)

- Real API integration (using mocked data only)
- Film data persistence beyond component state
- Button animation effects beyond state changes
- Detailed film information display (just poster image background)
- Keyboard navigation support
- Button reordering or customization
- Multiple film selection
- Film data caching strategies

## Design Considerations

- **MUI Integration**: Use Material-UI Card components for buttons and Snackbar for error notifications
- **Responsive Design**: Implement CSS flexbox for responsive button layout
- **Color Scheme**: Each button has distinct brand colors that blend with film poster images
- **Loading UX**: Blur effect provides clear visual distinction between active and loading states
- **Accessibility**: Ensure proper ARIA labels and focus states for screen readers

## Technical Considerations

- **Project Setup Prerequisites**:
  - Read and analyze `packages/frontend/package.json` for dependencies and scripts
  - Read and analyze `packages/backend/package.json` for server dependencies
  - Create `.env` files from `.env.example` templates in both frontend and backend
  - Install dependencies using `pnpm install` in root directory
  - Start development servers: backend (`pnpm dev` in packages/backend) and frontend (`pnpm dev` in packages/frontend)
  - Verify both servers are running: backend on `http://localhost:8080` and frontend on `http://localhost:3000`
  - Ensure GraphQL endpoint is accessible at `http://localhost:8080/api/graphql`
- **Atomic Design Structure**:
  - **Atoms**: Basic MUI components (CircularProgress, Snackbar)
  - **Molecules**: `FilmButtonCard` component in `src/components/molecules/`
  - **Organisms**: `FilmButtonsContainer` component in `src/components/organisms/`
  - **Pages**: Main page component in `src/components/pages/`
- **Frontend Structure**:
  - Create `ButtonState` enum in `src/shared/types/` directory
  - Create loading component using MUI CircularProgress
  - Create constants in `src/shared/constants/mocks/` for hardcoded film data
- **Component Architecture**:
  - `FilmButtonCard` (Molecule): Individual button with state management
  - `FilmButtonsContainer` (Organism): Container managing multiple buttons and layout
  - Page component: Handles data fetching and passes props to organism
- **Dependencies**: Material-UI (Card, CircularProgress, Snackbar components)
- **State Management**: React useState for component-level state management
- **CSS**: Flexbox for responsive layout, CSS blur for loading effect
- **Mock Implementation**: setTimeout for 3-second data fetch simulation
- **Error Handling**: Implement exponential backoff for retry mechanism
- **Parent-Child Architecture**: Button component receives props from parent, stays data-agnostic

## Success Metrics

- **Functional Success**: All four buttons can be clicked and show appropriate state changes
- **Performance Success**: Loading simulation completes within 3 seconds
- **Responsive Success**: Layout adapts correctly on desktop (4), tablet (2), and mobile (1) configurations
- **Error Handling Success**: Failed requests retry 3 times and show proper error notification
- **Visual Success**: Button backgrounds update with poster images after successful data fetch
- **Code Quality**: TypeScript enum properly defines button states with no type errors

## Open Questions

1. Should button hover effects include any animation or just color changes?
2. Should the component support different numbers of buttons or always expect exactly 4?
3. Should successful buttons remain clickable for re-fetching or become permanently disabled?
4. Should the error snackbar auto-dismiss or require user interaction?
5. Should we add loading progress indication beyond the spinner?
6. Should button colors be configurable via props or always use the specified colors?
