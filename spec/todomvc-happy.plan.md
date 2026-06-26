# TodoMVC React — Happy Paths Test Plan

## Application Overview

Happy-path test scenarios for the TodoMVC React demo at https://todomvc.com/examples/react/dist/. Assumes a fresh/blank state (localStorage cleared) for each scenario.

## Test Scenarios

### 1. TodoMVC React — Happy Paths

**Seed:** `tests/todomvc/seed.spec.ts`

#### 1.1. Add Todos

**File:** `tests/todomvc/add-todos.spec.ts`

**Steps:**
  1. Navigate to https://todomvc.com/examples/react/dist/ with a cleared localStorage (fresh state).
    - expect: Page loads and the new-todo input is visible.
  2. Type 'Buy milk' into the new-todo input and press Enter.
    - expect: A todo item with text 'Buy milk' appears in the list.
    - expect: The remaining count shows '1 item left' or equivalent.
  3. Type 'Walk dog' into the input and press Enter.
    - expect: A second todo 'Walk dog' appears in the list.
    - expect: The remaining count updates to '2 items left'.

#### 1.2. Complete a Todo

**File:** `tests/todomvc/complete-todo.spec.ts`

**Steps:**
  1. Ensure there are at least two active todos in the list (e.g., 'Buy milk', 'Walk dog').
    - expect: Both todos are present and not marked completed.
  2. Click the checkbox for the first todo ('Buy milk').
    - expect: The first todo is visually marked completed (checkbox checked, text styled).
    - expect: The remaining count decrements by one.

#### 1.3. Edit a Todo

**File:** `tests/todomvc/edit-todo.spec.ts`

**Steps:**
  1. Add a todo 'Read book' if not present.
    - expect: The 'Read book' todo appears in the list.
  2. Double-click the 'Read book' todo to enter edit mode, change text to 'Read React book', then press Enter.
    - expect: The todo text updates to 'Read React book' and remains in the same position.

#### 1.4. Delete a Todo

**File:** `tests/todomvc/delete-todo.spec.ts`

**Steps:**
  1. Ensure a todo 'Walk dog' exists in the list.
    - expect: The 'Walk dog' todo is visible.
  2. Hover the 'Walk dog' todo to reveal the delete (X) button and click it.
    - expect: The 'Walk dog' todo is removed from the list.
    - expect: The remaining count updates accordingly.

#### 1.5. Toggle All (complete/uncomplete all)

**File:** `tests/todomvc/toggle-all.spec.ts`

**Steps:**
  1. Create three active todos: 'A', 'B', 'C'.
    - expect: Three active todos are present; remaining count shows 3.
  2. Click the 'toggle-all' checkbox to mark all todos completed.
    - expect: All three todos are marked completed; remaining count shows 0.
  3. Click the 'toggle-all' checkbox again to uncheck all.
    - expect: All todos return to active state; remaining count returns to 3.

#### 1.6. Filter Todos (All/Active/Completed)

**File:** `tests/todomvc/filters.spec.ts`

**Steps:**
  1. Ensure there are a mix of active and completed todos (e.g., 'A' active, 'B' completed, 'C' active).
    - expect: The list contains both active and completed items.
  2. Click the 'Active' filter.
    - expect: Only active todos are visible in the list.
  3. Click the 'Completed' filter.
    - expect: Only completed todos are visible.
  4. Click the 'All' filter.
    - expect: All todos (active + completed) are visible again.

#### 1.7. Clear Completed (persistence check)

**File:** `tests/todomvc/clear-completed.spec.ts`

**Steps:**
  1. Create todos and mark some completed.
    - expect: Completed todos are present and 'Clear completed' button is visible.
  2. Click 'Clear completed'.
    - expect: All completed todos are removed from the list.
    - expect: Only active todos remain.
  3. Reload the page.
    - expect: Remaining todos persist and completed items remain cleared (localStorage reflects change).
