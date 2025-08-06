# 🚀 Full-Stack Learning Roadmap for Todo App

## 📊 **Current Progress Assessment**

### **TypeScript Journey** 🎯

- ✅ **Basic TypeScript Syntax** - Completed
- ✅ **Interfaces & Types** - Completed
- ✅ **Classes & Access Modifiers** - Completed
- ✅ **Generics Basics** - ✨ **EXCELLENT WORK!** ✨
- ✅ **Generic Repository Pattern** - Completed
- ✅ **Generic EventEmitter** - Completed
- ✅ **Utility Types (Partial, Omit)** - Completed
- ⏳ **Advanced TypeScript** - Ready for next level
- 🎯 **Next Focus**: Conditional Types & Template Literals

### **React Journey** ⚛️

- ✅ **Roadmap Created** - See `react-learning-roadmap.md`
- 🚀 **Ready to Start!** - Excellent TypeScript foundation
- 📋 **Next Phase**: Migrate to React + TypeScript

---

## 🎯 **Phase 1: Foundation (COMPLETED)**

### ✅ 1.1 Basic Types & Interfaces

```typescript
// Already implemented in your app
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
}

type FilterStatus = "all" | "pending" | "completed";
```

### ✅ 1.2 Classes & Access Modifiers

```typescript
// Your TodoStore & TodoUI classes
export class TodoStore {
  private todos: Todo[] = [];
  public addTodo(title: string): void {
    /* */
  }
  protected validateTitle(title: string): boolean {
    /* */
  }
}
```

### ✅ 1.3 Type Assertions & Guards

```typescript
// Already used in your DOM operations
const button = (e.target as HTMLElement).closest("button");
const filter = button.dataset.filter as FilterStatus;
```

---

## 🚀 **Phase 2: Intermediate (CURRENT FOCUS)**

### ✅ 2.1 Generics (COMPLETED - EXCELLENT!)

**✨ Your Outstanding Implementation:**

```typescript
// 🚀 Generic Repository Pattern - PERFECTLY IMPLEMENTED!
export class Repository<T extends { id: string }> {
  private storage: GenericStorage<T[]>;

  constructor(key: string) {
    this.storage = new GenericStorage<T[]>(key, []);
  }

  add(item: Omit<T, "id">): T {
    /* UUID generation */
  }
  update(id: string, updates: Partial<T>): T | undefined {
    /* */
  }
  filter<K extends keyof T>(property: K, value: T[K]): T[] {
    /* */
  }
}

// 🎯 Generic EventEmitter - MASTERFULLY DONE!
export class EventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    /* */
  }
  emit<K extends keyof T>(event: K, data: T[K]): void {
    /* */
  }
}

// 🏆 Applied in TodoStore with perfect typing!
interface TodoEvents {
  "todo:added": Todo;
  "todo:updated": Todo;
  "todo:deleted": string;
  "todo:toggled": Todo;
  "filter:changed": FilterStatus;
}
```

**🎉 What You've Mastered:**

- ✅ **Generic Constraints** (`T extends { id: string }`)
- ✅ **Utility Types** (`Omit<T, "id">`, `Partial<T>`)
- ✅ **Mapped Types** (`{ [K in keyof T]?: Array<...> }`)
- ✅ **Conditional Types** in generics
- ✅ **Advanced Function Signatures** with generics
- ✅ **UUID Integration** with type safety

**🚀 Ready for Next Level:**

constructor(key: string) {
this.storage = new GenericStorage<T[]>(key, []);
}

findById(id: number): T | undefined {
/\* _/
}
update(id: number, updates: Partial<T>): T | undefined {
/_ \*/
}
}

// 2. Generic Event System for Todo App
interface TodoEvents {
"todo:added": Todo;
"todo:updated": Todo;
"todo:deleted": number;
"filter:changed": FilterStatus;
}

class EventEmitter<T extends Record<string, any>> {
on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
/\* _/
}
emit<K extends keyof T>(event: K, data: T[K]): void {
/_ \*/
}
}

// Usage in your app:
const todoEvents = new EventEmitter<TodoEvents>();
todoEvents.on("todo:added", (todo) => console.log("New todo:", todo.title));

````

### ✅ 2.2 Utility Types (COMPLETED!)

**Apply to Todo App:**

```typescript
// 1. Partial for updates
function updateTodo(id: number, updates: Partial<Todo>): Todo | undefined {
  const todo = findTodoById(id);
  if (!todo) return undefined;
  return { ...todo, ...updates };
}

// 2. Pick for specific fields
type TodoSummary = Pick<Todo, "id" | "title" | "completed">;
type TodoInput = Omit<Todo, "id">; // For creating new todos

// 3. Record for grouped data
type TodosByStatus = Record<FilterStatus, Todo[]>;
function groupTodosByStatus(todos: Todo[]): TodosByStatus {
  return {
    all: todos,
    pending: todos.filter((t) => !t.completed),
    completed: todos.filter((t) => t.completed),
  };
}

// 4. Readonly for immutable state
type ReadonlyTodo = Readonly<Todo>;
const immutableTodos: ReadonlyArray<ReadonlyTodo> = getTodos();
````

### ⚡ 2.3 Advanced Function Types (WEEK 3)

```typescript
// 1. Function overloads for flexible APIs
class TodoAPI {
  getTodos(): Todo[];
  getTodos(filter: FilterStatus): Todo[];
  getTodos(filter: FilterStatus, limit: number): Todo[];
  getTodos(filter?: FilterStatus, limit?: number): Todo[] {
    // Implementation
  }
}

// 2. Higher-order functions with proper typing
function createTodoFilter<T extends Todo>(
  predicate: (todo: T) => boolean
): (todos: T[]) => T[] {
  return (todos: T[]) => todos.filter(predicate);
}

const completedFilter = createTodoFilter((todo) => todo.completed);
const urgentFilter = createTodoFilter(
  (todo) => todo.dueDate && new Date(todo.dueDate) < new Date()
);

// 3. Async/Promise patterns
type AsyncTodoStore = {
  [K in keyof TodoStore]: TodoStore[K] extends (...args: any[]) => any
    ? (...args: Parameters<TodoStore[K]>) => Promise<ReturnType<TodoStore[K]>>
    : TodoStore[K];
};
```

---

## 🔥 **Phase 3: Advanced (NEXT MONTH)**

### 🚀 3.1 Conditional Types

```typescript
// Smart type inference based on filter
type FilteredTodos<T extends FilterStatus> = T extends "completed"
  ? CompletedTodo[]
  : T extends "pending"
  ? PendingTodo[]
  : Todo[];

interface CompletedTodo extends Todo {
  completed: true;
  completedAt: Date;
}

interface PendingTodo extends Todo {
  completed: false;
}

function getTodos<T extends FilterStatus>(filter: T): FilteredTodos<T> {
  // Implementation with smart return type
}
```

### 🎯 3.2 Mapped Types

```typescript
// 1. Optional version of any interface
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type PartialTodo = Optional<Todo>; // All properties optional

// 2. Transform properties
type Timestamps<T> = {
  [K in keyof T]: T[K];
} & {
  createdAt: Date;
  updatedAt: Date;
};

type TodoWithTimestamps = Timestamps<Todo>;

// 3. Event handlers mapping
type TodoEventHandlers = {
  [K in keyof TodoEvents as `on${Capitalize<K>}`]: (
    data: TodoEvents[K]
  ) => void;
};
// Results in: onTodoAdded, onTodoUpdated, etc.
```

### ⚡ 3.3 Template Literal Types

```typescript
// 1. API endpoint types
type TodoEndpoint =
  | "/api/todos"
  | "/api/todos/completed"
  | "/api/todos/pending"
  | `/api/todos/${number}`;

// 2. CSS class names
type TodoClasses =
  | "todo-item"
  | "todo-item--completed"
  | "todo-item--pending"
  | "todo-item--overdue";

function addTodoClass(element: HTMLElement, className: TodoClasses): void {
  element.classList.add(className);
}

// 3. Localization keys
type LocaleKeys =
  | "todo.add.placeholder"
  | "todo.add.button"
  | "todo.filter.all"
  | "todo.filter.completed"
  | "todo.filter.pending";
```

---

## 🛠️ **Phase 4: Real-World Applications (MONTH 2)**

### 🔧 4.1 Design Patterns with TypeScript

```typescript
// 1. Observer Pattern for Todo App
interface Observer<T> {
  update(data: T): void;
}

class TodoSubject {
  private observers: Observer<Todo[]>[] = [];

  subscribe(observer: Observer<Todo[]>): void {
    this.observers.push(observer);
  }

  notify(todos: Todo[]): void {
    this.observers.forEach((observer) => observer.update(todos));
  }
}

// Your UI becomes an observer
class TodoUI implements Observer<Todo[]> {
  update(todos: Todo[]): void {
    this.renderTodos();
  }
}

// 2. Factory Pattern
abstract class TodoFactory {
  abstract createTodo(data: Omit<Todo, "id">): Todo;
}

class StandardTodoFactory extends TodoFactory {
  createTodo(data: Omit<Todo, "id">): Todo {
    return {
      ...data,
      id: Date.now(),
    };
  }
}

// 3. Strategy Pattern for Filters
interface FilterStrategy {
  filter(todos: Todo[]): Todo[];
}

class CompletedFilterStrategy implements FilterStrategy {
  filter(todos: Todo[]): Todo[] {
    return todos.filter((todo) => todo.completed);
  }
}

class TodoFilterContext {
  constructor(private strategy: FilterStrategy) {}

  executeFilter(todos: Todo[]): Todo[] {
    return this.strategy.filter(todos);
  }
}
```

### 🌐 4.2 API Integration with Strong Typing

```typescript
// 1. API Response types
interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
  timestamp: string;
}

interface TodoApiClient {
  getTodos(): Promise<ApiResponse<Todo[]>>;
  createTodo(todo: Omit<Todo, "id">): Promise<ApiResponse<Todo>>;
  updateTodo(id: number, updates: Partial<Todo>): Promise<ApiResponse<Todo>>;
  deleteTodo(id: number): Promise<ApiResponse<void>>;
}

// 2. Error handling with custom types
class TodoApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = "TodoApiError";
  }
}

// 3. Type-safe HTTP client
class TypedFetch {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new TodoApiError("GET request failed", response.status);
    }
    return response.json();
  }

  async post<T, U>(url: string, data: T): Promise<U> {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new TodoApiError("POST request failed", response.status);
    }
    return response.json();
  }
}
```

### 🧪 4.3 Testing with TypeScript

```typescript
// 1. Type-safe test utilities
interface TodoTestData {
  valid: Todo[];
  invalid: Partial<Todo>[];
  edge_cases: Partial<Todo>[];
}

const todoTestData: TodoTestData = {
  valid: [
    { id: 1, title: "Test todo", completed: false },
    { id: 2, title: "Another test", completed: true },
  ],
  invalid: [
    { title: "" }, // missing id
    { id: 1 }, // missing title
  ],
  edge_cases: [
    { id: 1, title: "a".repeat(1000), completed: false }, // very long title
  ],
};

// 2. Mock interfaces
interface MockTodoStore extends TodoStore {
  __testData: Todo[];
  reset(): void;
}

function createMockTodoStore(): MockTodoStore {
  return {
    __testData: [],
    addTodo: vi.fn(),
    deleteTodo: vi.fn(),
    // ... other methods
    reset(): void {
      this.__testData = [];
    },
  } as MockTodoStore;
}
```

---

## 📚 **Phase 5: Expert Level (MONTH 3+)**

### 🧬 5.1 Advanced Type Manipulation

```typescript
// 1. Recursive types for nested todos
interface NestedTodo extends Todo {
  subtasks?: NestedTodo[];
}

type FlattenTodos<T> = T extends NestedTodo
  ? T["subtasks"] extends NestedTodo[]
    ? T & { subtasks: FlattenTodos<T["subtasks"][number]>[] }
    : T
  : T;

// 2. Type-level programming
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ImmutableTodo = DeepReadonly<NestedTodo>;

// 3. Advanced conditional logic
type ValidateTodo<T> = T extends {
  id: number;
  title: string;
  completed: boolean;
}
  ? T["title"] extends ""
    ? never
    : T
  : never;
```

### 🔄 5.2 Meta-programming

```typescript
// 1. Decorator factories for Todo methods
function LogTodoAction(action: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`[${action}] ${propertyKey} called with:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`[${action}] ${propertyKey} result:`, result);
      return result;
    };
  };
}

class DecoratedTodoStore {
  @LogTodoAction("CREATE")
  addTodo(title: string): Todo {
    /* */
  }

  @LogTodoAction("UPDATE")
  updateTodo(id: number, updates: Partial<Todo>): Todo | undefined {
    /* */
  }
}

// 2. Runtime type validation
function validateTodo(todo: unknown): todo is Todo {
  return (
    typeof todo === "object" &&
    todo !== null &&
    typeof (todo as Todo).id === "number" &&
    typeof (todo as Todo).title === "string" &&
    typeof (todo as Todo).completed === "boolean"
  );
}
```

---

## 🎯 **Learning Schedule Suggestion**

### **Week 1-2: Generics Deep Dive**

- [ ] Implement Repository pattern in your todo app
- [ ] Create generic EventEmitter
- [ ] Add generic validation system

### **Week 3-4: Utility Types**

- [ ] Refactor all CRUD operations with Partial<Todo>
- [ ] Create type-safe API layer
- [ ] Implement grouped data with Record types

### **Week 5-6: Advanced Functions**

- [ ] Add function overloads to TodoStore
- [ ] Create higher-order filter functions
- [ ] Implement async patterns

### **Month 2: Design Patterns**

- [ ] Observer pattern for UI updates
- [ ] Factory pattern for different todo types
- [ ] Strategy pattern for filtering/sorting

### **Month 3+: Expert Features**

- [ ] Add nested todos support
- [ ] Implement runtime validation
- [ ] Create testing utilities
- [ ] Performance optimization with advanced types

---

## 🛠️ **Practical Exercises for Your Todo App**

### **This Week:**

1. **Generic EventEmitter**: Add events for all todo operations
2. **Repository Pattern**: Replace TodoStore with generic Repository
3. **Type-safe Filters**: Create strongly-typed filter system

### **Next Week:**

1. **API Layer**: Add mock API with full TypeScript support
2. **State Management**: Implement Redux-like pattern with TS
3. **Form Validation**: Create generic validation system

### **This Month:**

1. **Testing Suite**: Write comprehensive tests with TypeScript
2. **Performance**: Add memoization and optimization
3. **Accessibility**: Type-safe ARIA attributes and screen reader support

---

## 📖 **Resources**

### **Documentation:**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Utility Types Reference](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### **Practice Projects:**

- Extend this Todo App with all features above
- Build a typed HTTP client
- Create a type-safe state management library
- Build a typed form validation library

---

## 🏆 **Success Metrics**

### **Beginner → Intermediate:**

- [ ] Can write generic functions and classes
- [ ] Understands utility types (Pick, Omit, Partial)
- [ ] Can create type-safe APIs

### **Intermediate → Advanced:**

- [ ] Can use conditional and mapped types
- [ ] Understands template literal types
- [ ] Can implement design patterns with TypeScript

### **Advanced → Expert:**

- [ ] Can create complex type manipulations
- [ ] Understands TypeScript compiler internals
- [ ] Can teach others and contribute to TS community

---

## 🎯 **Next Steps & Resources**

### **TypeScript Mastery Path:**

1. **Continue Advanced Features** - Conditional types, template literals
2. **Design Patterns** - Observer, Factory, Strategy patterns
3. **Performance Optimization** - Advanced type checking
4. **Community Contribution** - Share your knowledge, help others

### **React Migration Path:**

📋 **React roadmap is now available in `react-learning-roadmap.md`**

**Your advantages for React:**

- ✅ Strong typing foundation with generics & utility types
- ✅ Component architecture understanding
- ✅ Event-driven patterns (similar to React's data flow)
- ✅ Repository pattern (great for React state management)

---

**🏆 Current Achievement: TypeScript Intermediate → Advanced Ready! 🚀**

**Next Mission: Apply TypeScript mastery to React development! ⚛️**
