# Implementation Plan: Learn By Job Role

## Overview

Expand the Nimbus app from 10 generic roles to 16 AWS job roles with category tags, certification paths, search/filter on the Courses screen, and backward-compatible role migration. All new data is static TypeScript; no backend changes.

## Tasks

- [x] 1. Create data layer files
  - [x] 1.1 Create `data/jobRoles.ts` with 16 JobRole definitions, CategoryTag type, CATEGORY_TAGS array, and helper functions (`getRolesByCategory`, `getJobRoleById`)
    - Define `CategoryTag` union type and `JobRole` interface
    - Export `JOB_ROLES` array with all 16 roles across 8 categories
    - Export `CATEGORY_TAGS` array
    - Export `getRolesByCategory()` and `getJobRoleById()` helpers
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 Create `data/certificationPaths.ts` with certification path data for all 16 roles
    - Define `CertificationLevel` type, `Certification` interface, `CertificationPath` interface
    - Export `CERTIFICATION_PATHS` record keyed by role ID with all 16 entries
    - Export `getCertificationPath()` helper
    - Ensure Solutions Architect path matches Requirement 2.5 exactly
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 1.3 Create `data/roleMigration.ts` with old-to-new role ID mapping
    - Export `ROLE_MIGRATION_MAP` mapping all 10 old role IDs to new role IDs
    - Export `migrateRoleId()` function that returns the original ID as-is if not found in the map
    - _Requirements: 7.4_

  - [ ]* 1.4 Write property tests for job role data integrity
    - **Property 1: Job role data integrity** — Verify all 16 roles have unique IDs, non-empty fields, and valid categories
    - **Validates: Requirements 1.1, 1.2**

  - [ ]* 1.5 Write property test for certification path coverage
    - **Property 2: Every job role has a certification path** — Verify every role ID in JOB_ROLES has a corresponding CERTIFICATION_PATHS entry
    - **Validates: Requirements 2.1**

  - [ ]* 1.6 Write property test for certification path data integrity and ordering
    - **Property 3: Certification path data integrity and ordering** — Verify each path has valid fields and certifications are ordered by level (Foundational < Associate < Professional < Specialty)
    - **Validates: Requirements 2.2, 2.3, 2.4**

- [x] 2. Update lesson data with new role mappings
  - [x] 2.1 Update `data/lessons/by-service/s3.ts` — replace old role IDs in the `roles` arrays with new 16 job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.2 Update `data/lessons/by-service/lambda.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.3 Update `data/lessons/by-service/dynamodb.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.4 Update `data/lessons/by-service/ec2.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.5 Update `data/lessons/by-service/elb.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.6 Update `data/lessons/by-service/cloudfront.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.7 Update `data/lessons/by-service/kinesis.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.8 Update `data/lessons/by-service/ecr.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.9 Update `data/lessons/by-service/vpc.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.10 Update `data/lessons/by-service/iam.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [x] 2.11 Update `data/lessons/by-service/sagemaker.ts` — replace old role IDs with new job role IDs
    - _Requirements: 7.1, 7.3_

  - [ ]* 2.12 Write property test for lesson role data integrity
    - **Property 8: Lesson role data integrity** — Verify every lesson has a non-empty `roles` array and every role ID references a valid JOB_ROLES entry
    - **Validates: Requirements 7.1, 7.3**

- [x] 3. Update lesson index with filtering and migration support
  - [x] 3.1 Update `data/lessons/index.ts` — import `migrateRoleId` and update `getLessonsByRole()` to resolve old role IDs via migration map
    - Import `migrateRoleId` from `../roleMigration`
    - Import `JOB_ROLES` and `CategoryTag` from `../jobRoles`
    - Update `getLessonsByRole()` to call `migrateRoleId()` and filter by resolved role IDs
    - _Requirements: 7.2, 7.4_

  - [x] 3.2 Add `getLessonsByCategory()` and `searchLessons()` functions to `data/lessons/index.ts`
    - `getLessonsByCategory(category)` filters lessons to roles belonging to the given category tag
    - `searchLessons(allLessons, query)` filters by case-insensitive title match
    - _Requirements: 5.2, 6.2_

  - [ ]* 3.3 Write property test for search filter correctness
    - **Property 5: Search filter correctness** — Verify `searchLessons` returns exactly the lessons whose title contains the query (case-insensitive)
    - **Validates: Requirements 5.2**

  - [ ]* 3.4 Write property test for combined search and tag filter intersection
    - **Property 6: Combined search and tag filter is intersection** — Verify combined filter result equals intersection of search results and tag filter results
    - **Validates: Requirements 6.2, 6.4**

  - [ ]* 3.5 Write property test for tag filter toggle round-trip
    - **Property 7: Tag filter toggle round-trip** — Verify selecting then deselecting a tag produces the original unfiltered list
    - **Validates: Requirements 6.3**

  - [ ]* 3.6 Write property test for role-based lesson lookup with backward compatibility
    - **Property 9: Role-based lesson lookup correctness with backward compatibility** — Verify `getLessonsByRole` returns non-empty results for every old role ID and all resolved IDs are valid
    - **Validates: Requirements 7.2, 7.4**

- [x] 4. Checkpoint
  - Ensure all data layer tests pass and lesson files compile cleanly. Ask the user if questions arise.

- [x] 5. Create new UI components
  - [x] 5.1 Create `components/SearchBar.tsx` — controlled text input with search icon and 300ms debounce
    - Accept `value`, `onChangeText`, and optional `placeholder` props
    - Style with dark theme (`#1B263B` background, `#fff` text)
    - Include accessible label for the search input
    - _Requirements: 5.1, 5.4_

  - [x] 5.2 Create `components/TagFilterChips.tsx` — horizontal ScrollView of category tag chips
    - Accept `tags`, `selectedTag`, and `onSelectTag` props
    - Selected chip uses `Colors.accent` background; unselected uses `#1B263B`
    - Tapping selected chip deselects it (passes `null`)
    - _Requirements: 6.1, 6.3, 6.5_

  - [x] 5.3 Create `components/CertificationPathView.tsx` — vertical timeline-style certification list
    - Accept `certificationPath` prop
    - Show circle indicator (filled for required, outlined for optional), name, and level badge per certification
    - _Requirements: 4.2, 4.3_

- [x] 6. Update SelectRoleScreen to use grouped roles
  - [x] 6.1 Refactor `screens/SelectRoleScreen.tsx` — replace flat `roles` array with `getRolesByCategory()` data, render `SectionList` grouped by CategoryTag headings
    - Import `JOB_ROLES`, `getRolesByCategory`, `CATEGORY_TAGS` from `data/jobRoles`
    - Each role card shows icon, displayName, and description
    - Single selection with visual highlight; deselects previous
    - Continue button disabled when no role selected
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 6.2 Write property test for single role selection
    - **Property 4: Single role selection** — Verify that after any sequence of role selections, exactly one role ID is stored and it matches the last selected role
    - **Validates: Requirements 3.2, 3.3**

- [x] 7. Create CertificationPathScreen and update navigation
  - [x] 7.1 Add `CertificationPath` route to `navigation/types.ts` with `{ roleId: string }` params
    - _Requirements: 4.1_

  - [x] 7.2 Create `screens/CertificationPathScreen.tsx` — receives `roleId` route param, looks up certification path, renders `CertificationPathView` or "no path available" fallback
    - _Requirements: 4.1, 4.2, 4.4_

  - [x] 7.3 Register `CertificationPathScreen` in `navigation/index.tsx` stack navigator
    - _Requirements: 4.1_

  - [x] 7.4 Add "View Certification Path" button to `SelectRoleScreen` on the selected role card, navigating to `CertificationPath` screen
    - _Requirements: 4.1_

- [x] 8. Update LessonsListScreen with search and tag filtering
  - [x] 8.1 Update `screens/LessonsListScreen.tsx` — add `SearchBar` at top, `TagFilterChips` below, maintain `searchQuery` and `selectedTag` local state
    - Import `SearchBar`, `TagFilterChips`, `searchLessons`, `getLessonsByCategory`
    - Apply debounced search (300ms) and tag filter; show intersection when both active
    - Show empty state with "No lessons found" message when no results
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 9. Final checkpoint
  - Ensure all tests pass and the app compiles without errors. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` as the PBT library
- Lesson role updates (tasks 2.1–2.11) are repetitive but must be done per file to keep changes reviewable
- Checkpoints ensure incremental validation
