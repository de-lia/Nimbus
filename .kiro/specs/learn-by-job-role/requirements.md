# Requirements Document

## Introduction

The "Learn By Job Role" feature expands the Nimbus AWS learning app's role-based learning system from 10 generic roles to 16 specific AWS job roles organized by category tags. Each role includes a description, responsibilities, and a certification path aligned with the AWS Certification Path Guide. The Courses screen gains a search bar with tag-based filtering so users can discover lessons by category. The role selection screen is updated to present the expanded role list grouped by category.

## Glossary

- **App**: The Nimbus AWS learning app, a React Native (Expo) mobile application for learning AWS services.
- **Job_Role**: A named AWS career role (e.g., Solutions Architect, Cloud Data Engineer) with a description, list of responsibilities, and a category tag.
- **Category_Tag**: A grouping label applied to one or more Job_Roles. The eight tags are: Architecture, Data Analytics, Development, Operations, DevOps, Security, Networking, AI/ML.
- **Certification_Path**: An ordered sequence of AWS certifications associated with a Job_Role, where each certification is marked as required or optional.
- **Certification**: A single AWS certification with a name and level (Foundational, Associate, Professional, or Specialty).
- **Role_Selection_Screen**: The screen (SelectRoleScreen) where users choose a Job_Role during onboarding or profile editing.
- **Courses_Screen**: The screen (LessonsListScreen) that displays lessons filtered by the user's selected learning path.
- **Search_Bar**: A text input on the Courses_Screen that filters displayed lessons by title or keyword.
- **Tag_Filter**: A set of selectable Category_Tag chips on the Courses_Screen that filter lessons to roles belonging to the selected tags.
- **User**: A person using the App.
- **Lesson**: A learning unit with content, difficulty, XP reward, and associated roles/services.

## Requirements

### Requirement 1: Define Job Roles Data Model

**User Story:** As a developer, I want a structured data model for the 16 AWS job roles, so that the App can reference role metadata consistently across screens.

#### Acceptance Criteria

1. THE App SHALL define exactly 16 Job_Roles, each with a unique identifier, display name, description, list of responsibilities, icon, and exactly one Category_Tag.
2. THE App SHALL assign each Job_Role to one of the eight Category_Tags: Architecture, Data Analytics, Development, Operations, DevOps, Security, Networking, or AI/ML.
3. THE App SHALL include the following Job_Roles grouped by Category_Tag:
   - Architecture: Solutions Architect, Application Architect
   - Data Analytics: Cloud Data Engineer
   - Development: Software Development Engineer
   - Operations: Cloud Administrator, Cloud Engineer
   - DevOps: Test Engineer, Cloud DevOps Engineer, DevSecOps Engineer
   - Security: Cloud Security Engineer, Cloud Security Architect
   - Networking: Network Engineer
   - AI/ML: Prompt Engineer, Machine Learning Engineer, Machine Learning Ops Engineer, Data Scientist

### Requirement 2: Define Certification Paths

**User Story:** As a learner, I want to see the AWS certification path for my chosen role, so that I know which certifications to pursue and in what order.

#### Acceptance Criteria

1. THE App SHALL define a Certification_Path for each of the 16 Job_Roles.
2. WHEN a Certification_Path is defined, THE App SHALL list certifications in recommended order from foundational to advanced.
3. THE App SHALL mark each Certification in a Certification_Path as either "required" or "optional".
4. THE App SHALL define each Certification with a name and a level selected from: Foundational, Associate, Professional, or Specialty.
5. WHEN the Solutions Architect Job_Role is selected, THE App SHALL display a Certification_Path containing: AWS Cloud Practitioner (Foundational, required), AI Practitioner (Foundational, required), Solutions Architect Associate (Associate, required), Solutions Architect Professional (Professional, required), and Security Specialty (Specialty, optional).

### Requirement 3: Update Role Selection Screen

**User Story:** As a learner, I want to browse the expanded list of 16 job roles grouped by category during onboarding, so that I can pick the role that matches my career goals.

#### Acceptance Criteria

1. WHEN the User navigates to the Role_Selection_Screen, THE App SHALL display all 16 Job_Roles grouped under their Category_Tag headings.
2. WHEN the User taps a Job_Role card, THE Role_Selection_Screen SHALL visually highlight the selected Job_Role and deselect any previously selected Job_Role.
3. WHEN the User selects a Job_Role and taps "Continue", THE App SHALL store the selected Job_Role identifier in the User context and navigate to the next onboarding step.
4. THE Role_Selection_Screen SHALL display each Job_Role card with the role icon, display name, and description.
5. WHEN the User has not selected any Job_Role, THE Role_Selection_Screen SHALL disable the "Continue" button.

### Requirement 4: Display Certification Path for Selected Role

**User Story:** As a learner, I want to view the full certification path for a role, so that I can plan my learning journey toward AWS certifications.

#### Acceptance Criteria

1. WHEN the User selects a Job_Role, THE App SHALL provide a way to view the Certification_Path for that Job_Role.
2. WHEN the Certification_Path is displayed, THE App SHALL show each Certification in order with its name, level, and required/optional status.
3. WHEN a Certification is marked as optional, THE App SHALL visually distinguish the optional Certification from required Certifications.
4. IF a Job_Role has no Certification_Path defined, THEN THE App SHALL display a message indicating that no certification path is available for the selected role.

### Requirement 5: Add Search Bar to Courses Screen

**User Story:** As a learner, I want to search lessons by keyword on the Courses screen, so that I can find specific topics within my learning path.

#### Acceptance Criteria

1. WHEN the User navigates to the Courses_Screen, THE App SHALL display a Search_Bar at the top of the lesson list.
2. WHEN the User types text into the Search_Bar, THE Courses_Screen SHALL filter the displayed lessons to show only lessons whose title contains the entered text (case-insensitive match).
3. WHEN the Search_Bar text is cleared, THE Courses_Screen SHALL display all lessons for the current learning path.
4. WHILE the User is typing in the Search_Bar, THE Courses_Screen SHALL update the filtered results after each keystroke with a debounce delay of 300 milliseconds.

### Requirement 6: Add Tag-Based Filtering to Courses Screen

**User Story:** As a learner, I want to filter courses by category tags, so that I can explore lessons relevant to specific AWS career domains.

#### Acceptance Criteria

1. WHEN the User navigates to the Courses_Screen, THE App SHALL display a horizontal scrollable row of Category_Tag filter chips below the Search_Bar.
2. WHEN the User taps a Category_Tag chip, THE Courses_Screen SHALL filter lessons to show only lessons associated with Job_Roles that belong to the selected Category_Tag.
3. WHEN the User taps an already-selected Category_Tag chip, THE Courses_Screen SHALL deselect the tag and revert to showing all lessons for the current learning path.
4. WHEN a Category_Tag filter is active together with Search_Bar text, THE Courses_Screen SHALL apply both filters, showing only lessons that match the search text AND belong to the selected Category_Tag.
5. THE Courses_Screen SHALL visually distinguish the selected Category_Tag chip from unselected chips using a different background color.

### Requirement 7: Map Lessons to New Job Roles

**User Story:** As a developer, I want existing lessons to be mapped to the new 16 job roles, so that learners see relevant content when they select a role.

#### Acceptance Criteria

1. THE App SHALL update the `roles` field of each existing Lesson to reference the new Job_Role identifiers.
2. WHEN a User selects a Job_Role, THE Courses_Screen SHALL display all Lessons whose `roles` array includes the selected Job_Role identifier.
3. THE App SHALL ensure that every Lesson is associated with at least one Job_Role.
4. THE App SHALL maintain backward compatibility by mapping the previous 10 role identifiers to the new 16 Job_Role identifiers so that existing user selections continue to resolve to valid lessons.
