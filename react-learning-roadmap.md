# ⚛️ **REACT LEARNING ROADMAP**

## 🎯 **Migration Strategy: TypeScript → React + TypeScript**

### **Why This Is Perfect Timing:**

✅ **Solid TypeScript Foundation** - Your generics, utility types mastery  
✅ **Clean Architecture** - Repository pattern, Event system  
✅ **Type-Safe Codebase** - Ready for React's type system

---

## 🚀 **Phase 1: React Foundation Setup**

### **1.1 Dependencies & Configuration**

```bash
# Add React dependencies
npm install react react-dom
npm install --save-dev @types/react @types/react-dom

# Update Vite config for React
# Update tsconfig.json for JSX
```

### **1.2 Project Structure Migration**

```
src/
├── components/           # React components
│   ├── App.tsx
│   ├── TodoForm.tsx
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   └── FilterButtons.tsx
├── hooks/               # Custom React hooks
│   ├── useTodos.ts
│   ├── useLocalStorage.ts
│   └── useFilter.ts
├── context/             # React Context
│   └── TodoContext.tsx
├── types/               # Keep existing types
├── utils/               # Keep Repository, Storage
└── styles/              # Component styles
```

---

## 🔥 **Phase 2: State Management Migration**

### **2.1 From EventEmitter to React Context**

**Current (EventEmitter):**

```typescript
// Current TodoStore with events
todoStore.on("todo:added", () => this.renderTodos());
```

**New (React Context + useReducer):**

```typescript
// TodoContext.tsx
interface TodoState {
  todos: Todo[];
  filter: FilterStatus;
}

type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "SET_FILTER"; payload: FilterStatus };

const TodoContext = createContext<{
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
} | null>(null);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    // ... other cases
  }
}
```

### **2.2 Custom Hooks for Business Logic**

```typescript
// hooks/useTodos.ts - Replace TodoStore
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");

  const { state, dispatch } = context;

  const addTodo = useCallback(
    (title: string) => {
      const todo = repository.add({ title, completed: false });
      dispatch({ type: "ADD_TODO", payload: todo });
    },
    [dispatch]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const updated = repository.update(id, {
        completed: !getCurrentTodo(id).completed,
      });
      if (updated) dispatch({ type: "TOGGLE_TODO", payload: id });
    },
    [dispatch]
  );

  return {
    todos: state.todos,
    filter: state.filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filteredTodos: useMemo(
      () => filterTodos(state.todos, state.filter),
      [state.todos, state.filter]
    ),
  };
}
```

---

## ⚡ **Phase 3: Component Development**

### **3.1 Main App Component**

```typescript
// components/App.tsx
import React from "react";
import { TodoProvider } from "../context/TodoContext";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterButtons from "./FilterButtons";

export default function App() {
  return (
    <TodoProvider>
      <div className="app">
        <header>
          <h1>React Todo App</h1>
          <TodoForm />
        </header>

        <main>
          <FilterButtons />
          <TodoList />
        </main>
      </div>
    </TodoProvider>
  );
}
```

### **3.2 Form Component with TypeScript**

```typescript
// components/TodoForm.tsx
import React, { useState, FormEvent } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo..."
        className="todo-input"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

### **3.3 Todo Item with Props Interface**

```typescript
// components/TodoItem.tsx
import React, { useState } from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onEdit(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)} className="todo-title">
          {todo.title}
        </span>
      )}

      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        ❌
      </button>
    </li>
  );
}
```

---

## 🎨 **Phase 4: Styling & UX Enhancement**

### **4.1 CSS Modules Setup**

```css
/* components/TodoItem.module.css */
.todoItem {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.todoItem:hover {
  background-color: #f8f9fa;
}

.completed {
  opacity: 0.6;
}

.completed .todoTitle {
  text-decoration: line-through;
}
```

```typescript
// TodoItem.tsx - with CSS Modules
import styles from "./TodoItem.module.css";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      {/* ... */}
    </li>
  );
}
```

### **4.2 Styled Components Alternative**

```typescript
// Using styled-components
import styled from "styled-components";

const TodoItemContainer = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  opacity: ${(props) => (props.completed ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const TodoTitle = styled.span<{ completed: boolean }>`
  flex: 1;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;
```

---

## 🧪 **Phase 5: Testing & Optimization**

### **5.1 Testing with React Testing Library**

```typescript
// __tests__/TodoItem.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoProvider } from "../context/TodoContext";
import TodoItem from "../components/TodoItem";
import type { Todo } from "../types";

const mockTodo: Todo = {
  id: "1",
  title: "Test todo",
  completed: false,
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TodoProvider>{component}</TodoProvider>);
};

describe("TodoItem", () => {
  test("renders todo item correctly", () => {
    const mockProps = {
      todo: mockTodo,
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn(),
    };

    renderWithProvider(<TodoItem {...mockProps} />);

    expect(screen.getByText("Test todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("calls onToggle when checkbox is clicked", () => {
    const mockOnToggle = vi.fn();
    const mockProps = {
      todo: mockTodo,
      onToggle: mockOnToggle,
      onDelete: vi.fn(),
      onEdit: vi.fn(),
    };

    renderWithProvider(<TodoItem {...mockProps} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });
});
```

### **5.2 Performance Optimization**

```typescript
// Optimized TodoList with React.memo
import React, { memo } from "react";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

const TodoList = memo(function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
});

// Optimized with useCallback in parent
function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();

  const handleToggle = useCallback(
    (id: string) => {
      toggleTodo(id);
    },
    [toggleTodo]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleEdit = useCallback(
    (id: string, title: string) => {
      editTodo(id, title);
    },
    [editTodo]
  );

  return (
    <TodoList
      todos={todos}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}
```

---

## 📋 **Learning Milestones & Checkpoints**

### **Week 1: Foundation** 🏗️

- [ ] Setup React + TypeScript
- [ ] Create basic component structure
- [ ] Migrate main App component
- [ ] **Checkpoint**: App renders with static data

### **Week 2: State Management** 🔄

- [ ] Implement TodoContext + useReducer
- [ ] Create useTodos custom hook
- [ ] Replace all event-driven logic
- [ ] **Checkpoint**: Full CRUD operations working

### **Week 3: Component Polish** ✨

- [ ] Implement all components with TypeScript
- [ ] Add proper prop interfaces
- [ ] Handle edge cases and validation
- [ ] **Checkpoint**: Feature parity with vanilla version

### **Week 4: Enhancement** 🚀

- [ ] Add CSS Modules or styled-components
- [ ] Implement animations and transitions
- [ ] Add responsive design
- [ ] **Checkpoint**: Superior UX to original

### **Month 2: Advanced React** 🎯

- [ ] Setup testing with RTL
- [ ] Performance optimization
- [ ] Error boundaries
- [ ] **Final Goal**: Production-ready React app

---

## 🏆 **Success Metrics**

### **TypeScript + React Mastery:**

- [ ] Can create typed React components
- [ ] Understands React hooks with TypeScript
- [ ] Can implement Context API with proper typing
- [ ] Masters custom hooks development

### **Architecture Skills:**

- [ ] Converts imperative to declarative code
- [ ] Implements proper separation of concerns
- [ ] Uses composition over inheritance
- [ ] Understands React's mental model

### **Production Ready:**

- [ ] Implements comprehensive testing
- [ ] Optimizes for performance
- [ ] Handles edge cases gracefully
- [ ] Creates maintainable, scalable code

---

## 🎯 **Next Steps**

### **Immediate Action Items:**

1. **Install React Dependencies**

   ```bash
   npm install react react-dom @types/react @types/react-dom
   ```

2. **Update Vite Configuration**

   - Add React plugin to `vite.config.ts`
   - Update `tsconfig.json` for JSX support

3. **Create Project Structure**

   - Create `components/`, `hooks/`, `context/` directories
   - Move existing utilities to `utils/`

4. **Start with App Component**
   - Convert current DOM manipulation to React components
   - Keep existing Repository and EventEmitter patterns initially

### **Learning Resources:**

- **Official React Docs**: [react.dev](https://react.dev)
- **TypeScript + React**: [typescript-cheatsheets.netlify.app](https://typescript-cheatsheets.netlify.app/docs/react/)
- **React Testing Library**: [testing-library.com/react](https://testing-library.com/docs/react-testing-library/intro/)

---

**🎯 Current Status: Ready to Begin React Journey! Your TypeScript mastery gives you a HUGE advantage! 🚀**

### **Why Your TypeScript Background Is Perfect:**

✅ **Strong Typing Foundation** - You already understand interfaces, generics, utility types  
✅ **Component Architecture** - Your Repository and EventEmitter patterns translate well to React  
✅ **State Management Experience** - Event-driven architecture similar to React's unidirectional data flow  
✅ **Advanced Patterns** - Ready for Context API, custom hooks, and performance optimization

**You're not starting from zero - you're upgrading your already solid foundation! 🚀**
