# Task Tracker Frontend Documentation

This document explains how this frontend project was created from scratch and how it works now.

The goal is simple: after reading this document, you should be able to create another frontend project like this again.

Think of the frontend like a small shop:

- React components are the rooms.
- Routes are the doors.
- API files are the phone calls to the backend.
- Redux is the memory box where we keep important data like the login token.
- Local storage is the cupboard where Redux saves that token even after refresh.

## 1. What This Project Is

This is a Task Tracker frontend.

It allows a user to:

- Sign up.
- Login.
- Save the login token.
- Protect the home page from users who are not logged in.
- Create tasks.
- Read tasks using pagination.
- Update tasks.
- Delete tasks.
- Upload an image for a task.
- Show uploaded task images.
- Remove an image from the frontend view.

The frontend talks to a backend running at:

```txt
http://localhost:5000
```

That value is stored in `.env`.

## 2. Main Technologies Used

This project uses:

- React: for building the UI.
- TypeScript: JavaScript with types.
- Vite: fast frontend development tool.
- React Router DOM: for page navigation.
- Axios: for calling backend APIs.
- Redux Toolkit: for global state management.
- React Redux: connects Redux to React.
- Redux Persist: saves Redux state in local storage.
- Tailwind CSS: for styling.

## 3. How To Create The Project From Scratch

Open a terminal in the folder where you want to create your project.

Run this command:

```bash
npm create vite@latest taskTracker-frontend
```

Then Vite asks questions.

Choose:

```txt
Framework: React
Variant: TypeScript
```

Go inside the project:

```bash
cd taskTracker-frontend
```

Install the default packages:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

Vite starts the frontend, usually at:

```txt
http://localhost:5173
```

## 4. Packages Installed For This Project

After creating the Vite project, install these packages:

```bash
npm install axios react-router-dom @reduxjs/toolkit react-redux redux-persist tailwindcss @tailwindcss/vite
```

What each package does:

- `axios`: calls backend APIs.
- `react-router-dom`: creates pages like login, signup, and home.
- `@reduxjs/toolkit`: creates Redux store and slices easily.
- `react-redux`: gives React access to Redux.
- `redux-persist`: saves Redux data in browser local storage.
- `tailwindcss`: gives utility CSS classes.
- `@tailwindcss/vite`: connects Tailwind CSS to Vite.

## 5. Package Scripts

In `package.json`, this project has these scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

Use them like this:

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the final production files.

```bash
npm run lint
```

Checks the code style and possible mistakes.

```bash
npm run preview
```

Previews the production build.

## 6. Project Folder Structure

Current important folder structure:

```txt
taskTracker-frontend
|
|-- .env
|-- package.json
|-- vite.config.ts
|-- index.html
|-- public
|   |-- favicon.svg
|   |-- icons.svg
|
|-- src
|   |-- App.tsx
|   |-- App.css
|   |-- main.tsx
|   |-- index.css
|   |
|   |-- assets
|   |   |-- photo1.jpg
|   |   |-- photo2.jpg
|   |   |-- ...
|   |
|   |-- components
|   |   |-- Home.tsx
|   |   |-- login.tsx
|   |   |-- ProtectedRoute.tsx
|   |   |-- signUp.tsx
|   |
|   |-- pages
|   |   |-- loginPage.tsx
|   |   |-- signUpPage.tsx
|   |
|   |-- redux
|   |   |-- store.ts
|   |   |-- features
|   |       |-- authSlice.ts
|   |
|   |-- lib
|       |-- api
|       |   |-- auth
|       |   |   |-- api.ts
|       |   |
|       |   |-- task
|       |       |-- api.ts
|       |
|       |-- utils
|           |-- apiEndPoints
|               |-- apiEndPoints.ts
```

## 7. What Each Folder Means

### `src/components`

This folder contains reusable UI pieces.

Current components:

- `login.tsx`: login form.
- `signUp.tsx`: signup form.
- `Home.tsx`: main task page.
- `ProtectedRoute.tsx`: stops users from opening `/home` without a token.

### `src/pages`

This folder contains page-level components.

Current pages:

- `signUpPage.tsx`: shows the signup component.
- `loginPage.tsx`: shows the login component.

Note: In the current `App.tsx`, login is imported directly from `components/login`, not from `pages/loginPage`.

### `src/redux`

This folder contains Redux setup.

Current Redux files:

- `store.ts`: creates the Redux store and persist setup.
- `features/authSlice.ts`: stores and clears the login token.

### `src/lib/api`

This folder contains API call functions.

Current API files:

- `auth/api.ts`: signup and login API calls.
- `task/api.ts`: task CRUD, pagination, and image upload API calls.

### `src/lib/utils/apiEndPoints`

This folder contains backend endpoint names in one place.

Current file:

- `apiEndPoints.ts`

This makes API URLs easier to manage.

## 8. Environment Variable Setup

Create `.env` in the project root.

Current `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Important rule:

In Vite, frontend environment variables must start with:

```txt
VITE_
```

That is why the variable is named:

```txt
VITE_API_BASE_URL
```

You use it in code like this:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

This gives:

```txt
http://localhost:5000
```

## 9. Tailwind CSS Setup

In `vite.config.ts`, Tailwind was added as a Vite plugin:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
```

In `src/index.css`, Tailwind files are imported:

```css
@layer theme, custom-base, custom-components, custom-utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(custom-base);
@import "tailwindcss/utilities.css" layer(custom-utilities);
```

A Google font is also imported:

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Prata&display=swap');
```

Then global styles are added:

```css
@layer custom-base {
  * {
    font-family: "Outfit", sans-serif;
  }

  button {
    @apply cursor-pointer;
  }

  input:not([type='checkbox']) {
    @apply outline-none focus:ring border border-gray-300
    focus:ring-blue-500 focus:border-blue-500 rounded-lg
  }

  textarea {
    @apply outline-none focus:ring border border-gray-300
    focus:ring-blue-500 focus:border-blue-500 rounded-lg resize-none;
  }
}
```

Meaning:

- Every element uses the Outfit font.
- Buttons show pointer cursor.
- Inputs get border, rounded corners, and blue focus ring.
- Textareas get the same styling and cannot be resized.

## 10. Application Starting Point

The app starts from `src/main.tsx`.

Current code:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { store, persistor  } from './redux/store'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
)
```

Small explanation:

- `createRoot(...)`: puts React inside the HTML page.
- `StrictMode`: helps find problems during development.
- `Provider`: gives Redux store to the whole app.
- `PersistGate`: waits for saved Redux data to load from local storage.
- `BrowserRouter`: allows routes like `/`, `/signup`, and `/home`.
- `App`: main app component.

## 11. Routing Setup

Routes are created in `src/App.tsx`.

Current routes:

```tsx
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
</Routes>
```

Meaning:

- `/` shows login page.
- `/signup` shows signup page.
- `/home` shows task page only if the user has a token.

The `/home` route is protected:

```tsx
<ProtectedRoute>
  <Home />
</ProtectedRoute>
```

This means:

First check token.

If token exists, show `Home`.

If token does not exist, send user back to `/`.

## 12. API Endpoint File

File:

```txt
src/lib/utils/apiEndPoints/apiEndPoints.ts
```

Current code:

```ts
const apiEndpoints = {
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  GET_TASKS: "/api/tasks",
  CREATE_TASK: "/api/tasks",
  DELETE_TASK: "/api/tasks",
  UPDATE_TASK: "/api/tasks",
  PAGIATED: "/api/tasks/paginated"
}

export default apiEndpoints
```

Why this file is useful:

Instead of writing endpoint strings everywhere, we keep them in one place.

Example:

```ts
apiEndpoints.LOGIN
```

means:

```txt
/api/auth/login
```

Full login API URL becomes:

```txt
http://localhost:5000/api/auth/login
```

## 13. Auth API File

File:

```txt
src/lib/api/auth/api.ts
```

This file handles signup and login.

It imports:

```ts
import apiEndpoints from "../../utils/apiEndPoints/apiEndPoints";
import axios from "axios";
```

It reads backend base URL:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

### Signup API

Current signup function:

```ts
const signUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const data = {
      name,
      email,
      password,
    };

    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.SIGNUP}`,
      data
    );

    return response;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};
```

Meaning:

- It receives `name`, `email`, and `password`.
- It creates a `data` object.
- It sends a POST request to backend.
- It returns the backend response.
- If something fails, it logs the error and throws it again.

Example request body:

```json
{
  "name": "Hemanth",
  "email": "hemanth@example.com",
  "password": "123456"
}
```

Example URL:

```txt
http://localhost:5000/api/auth/signup
```

### Login API

Current login function:

```ts
const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const data = {
      email,
      password
    };

    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.LOGIN}`,
      data
    );

    return response;
  } catch (error) {
    console.log("Login Failed", error);
    throw error;
  }
}
```

Meaning:

- It receives `email` and `password`.
- It sends a POST request to backend login endpoint.
- It returns the backend response.

Example request body:

```json
{
  "email": "hemanth@example.com",
  "password": "123456"
}
```

Example URL:

```txt
http://localhost:5000/api/auth/login
```

At the end, both functions are exported:

```ts
export { login, signUp };
```

## 14. Redux Toolkit Setup

Redux is used here to store the login token globally.

Why?

Because many parts of the app need the token:

- Protected route needs token.
- Task APIs need token.
- Home page needs token.

Instead of passing token from component to component, Redux stores it in one common place.

## 15. Auth Slice

File:

```txt
src/redux/features/authSlice.ts
```

Current code:

```ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
```

Simple explanation:

At first:

```ts
token: null
```

means user is not logged in.

When login succeeds:

```ts
setToken(token)
```

stores the token.

When logout is needed:

```ts
clearToken()
```

removes the token.

## 16. Redux Store

File:

```txt
src/redux/store.ts
```

The store connects Redux with the app.

Current imports:

```ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { persistReducer, persistStore } from "redux-persist";
```

### Custom Local Storage Setup

This project creates a storage object:

```ts
const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};
```

Meaning:

- `getItem`: reads from browser local storage.
- `setItem`: saves into browser local storage.
- `removeItem`: removes from browser local storage.

### Persist Config

```ts
const persistConfig = {
  key: "auth",
  storage,
};
```

Meaning:

Redux Persist will save the auth data using the key:

```txt
auth
```

### Persisted Reducer

```ts
const persistedReducer = persistReducer(
  persistConfig,
  authReducer
);
```

Meaning:

The auth reducer is wrapped with Redux Persist.

So the token is saved even after page refresh.

### Store Creation

```ts
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
```

Meaning:

- The Redux store has one main state section called `auth`.
- `auth` contains the token.
- Some Redux Persist actions are ignored by serializable check to avoid warnings.

### Persistor

```ts
export const persistor = persistStore(store);
```

This starts the saving and loading process.

### Types

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Meaning:

- `RootState` helps TypeScript understand the shape of Redux state.
- `AppDispatch` helps TypeScript understand dispatch.

## 17. Connecting Redux To React

In `main.tsx`, the app is wrapped with:

```tsx
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PersistGate>
</Provider>
```

This is very important.

Without `Provider`, components cannot use:

```ts
useSelector()
useDispatch()
```

Without `PersistGate`, saved token may not load correctly before the app starts.

## 18. Protected Route

File:

```txt
src/components/ProtectedRoute.tsx
```

Current code:

```tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const token = useSelector((state: any) => state.auth.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
```

Meaning:

- It checks Redux for the token.
- If token is missing, user goes to login page.
- If token exists, user can see the protected page.

Example:

```tsx
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
```

This protects `/home`.

## 19. Signup Component

File:

```txt
src/components/signUp.tsx
```

This component has three input fields:

- Name
- Email
- Password

It uses React state:

```ts
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

Meaning:

- `name` stores what user types in name input.
- `email` stores what user types in email input.
- `password` stores what user types in password input.

On form submit:

```ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await signUp({
      name,
      email,
      password,
    });

    console.log("API Success:", response.data);

    const token = response.data.token;

    dispatch(setToken(token));
  } catch (error) {
    console.log("API Error:", error);
  }
};
```

Step by step:

1. User clicks Sign Up.
2. `e.preventDefault()` stops page refresh.
3. `signUp(...)` sends data to backend.
4. Backend response is printed.
5. Token is taken from response.
6. Token is saved in Redux using `dispatch(setToken(token))`.

## 20. Login Component

File:

```txt
src/components/login.tsx
```

This component has two input fields:

- Email
- Password

It uses React state:

```ts
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
```

It also uses:

```ts
const navigate = useNavigate();
const dispatch = useDispatch();
```

Meaning:

- `navigate` moves user to another route.
- `dispatch` sends action to Redux.

On login submit:

```ts
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()

  try {
    const response = await login({
      email,
      password,
    })

    console.log("Login response:", response.data);

    const token =
      response.data.token ||
      response.data.accessToken ||
      response.data.data?.token ||
      response.data.user?.token;

    if (!token) {
      console.log("Login response did not include a token");
      return;
    }

    dispatch(setToken(token));
    navigate("/home");
  } catch (error) {
    console.log("API Error:", error);
  }
}
```

Step by step:

1. User enters email and password.
2. User clicks Login.
3. Page refresh is stopped.
4. Frontend calls login API.
5. Response is checked for token.
6. Token can come from different response shapes:
   - `response.data.token`
   - `response.data.accessToken`
   - `response.data.data?.token`
   - `response.data.user?.token`
7. If token is missing, stop.
8. If token exists, save token in Redux.
9. Move user to `/home`.

## 21. Pages Folder

### Signup Page

File:

```txt
src/pages/signUpPage.tsx
```

Code:

```tsx
import SignUp from '../components/signUp'

const SignUpPage = () => {
  return <SignUp />
}

export default SignUpPage
```

Meaning:

This page only shows the `SignUp` component.

### Login Page

File:

```txt
src/pages/loginPage.tsx
```

Code:

```tsx
import React from 'react'
import Login from '../components/login'

const loginPage = () => {
  return (
    <Login/>
  )
}

export default loginPage
```

Meaning:

This page only shows the `Login` component.

Note:

The current app imports `Login` directly in `App.tsx`.

## 22. Task API File

File:

```txt
src/lib/api/task/api.ts
```

This file contains all task-related backend calls.

It imports:

```ts
import axios from "axios";
import apiEndpoints from "../../utils/apiEndPoints/apiEndPoints";
```

It uses:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

## 23. Get Tasks API

```ts
export const getTasks = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${apiEndpoints.GET_TASKS}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch(error) {
    console.log("Get Tasks Failed", error);
    throw error;
  }
}
```

Meaning:

- Sends GET request to `/api/tasks`.
- Sends token in headers.
- Backend uses token to know which user is asking.

Header example:

```txt
Authorization: Bearer your-login-token
```

## 24. Create Task API

```ts
export const createTask = async (
  taskData: any,
  token: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.CREATE_TASK}`,
      taskData,
      {
        headers: {
          Authorization : `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log("create Task Failed", error);
    throw error;
  }
};
```

Meaning:

- Sends POST request to `/api/tasks`.
- Sends task data in body.
- Sends token in headers.

Example task body:

```json
{
  "title": "Learn Redux",
  "description": "Understand slices and store",
  "status": "pending",
  "due_date": "2026-05-29"
}
```

## 25. Delete Task API

```ts
export const deleteTask = async (id:number, token:string) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}${apiEndpoints.DELETE_TASK}/${id}`,
      {
        headers: {
          Authorization : `Bearer ${token}`,
        }
      }
    );

    return response;
  } catch (error) {
    console.log("Delete failed", error);
    throw error;
  }
};
```

Meaning:

- Sends DELETE request.
- Adds task id at the end of URL.

Example:

```txt
http://localhost:5000/api/tasks/3
```

This deletes task with id `3`.

## 26. Update Task API

```ts
export const updateTask = async (
  id:number,
  taskData: any,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}${apiEndpoints.UPDATE_TASK}/${id}`,
      taskData,
      {
        headers:{
          Authorization : `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Update failed", error);
    throw error;
  }
}
```

Meaning:

- Sends PUT request.
- Sends updated task data.
- Sends token.

Example URL:

```txt
http://localhost:5000/api/tasks/3
```

Example body:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "due_date": "2026-05-30"
}
```

## 27. Paginated Tasks API

```ts
export const getPaginatedTasks = async (
  offset: number,
  limit: number,
  token: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${apiEndpoints.PAGIATED}?offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response;
  } catch(error) {
    console.log("Failed to get paginatedTasks", error);
  }
}
```

Meaning:

- Gets tasks in small groups.
- `offset` tells which page/group to get.
- `limit` tells how many tasks to get.

Current Home page uses:

```ts
const [offset, setOffset] = useState<number>(1);
const limit: number = 5;
```

Example URL:

```txt
http://localhost:5000/api/tasks/paginated?offset=1&limit=5
```

This means:

Give page/group `1`, and give `5` tasks.

## 28. Upload Image API

```ts
export const uploadImage = async (
  id: number,
  image: File,
  token: string
) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.GET_TASKS}/${id}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
```

Meaning:

- `FormData` is used because image/file upload cannot be sent like normal JSON.
- The image is added using the key `"image"`.
- Backend receives it from the form data.

Example URL:

```txt
http://localhost:5000/api/tasks/3/image
```

This uploads image for task id `3`.

## 29. Home Component

File:

```txt
src/components/Home.tsx
```

This is the main task page.

It does:

- Shows create task form.
- Shows task list.
- Loads paginated tasks.
- Creates task.
- Deletes task.
- Edits task.
- Updates task.
- Uploads image.
- Shows task image.
- Removes image from frontend state.

## 30. Task Type

Inside `Home.tsx`, a task type is created:

```ts
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  image?: string | null;
}
```

Meaning:

Every task has:

- `id`: task id.
- `title`: task title.
- `description`: task description.
- `status`: task status.
- `dueDate`: due date.
- `image`: optional image path.

## 31. Home State Variables

The Home component uses many state variables:

```ts
const [tasks, setTasks] = useState<Task[]>([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState("pending");
const [dueDate, setDueDate] = useState("");
const [editTask, setEditTask] = useState<Task | null>(null);
const [offset, setOffset] = useState<number>(1);
const limit: number = 5;
```

Meaning:

- `tasks`: all tasks shown on screen.
- `title`: create task title input.
- `description`: create task description input.
- `status`: create task status select.
- `dueDate`: create task date input.
- `editTask`: the task currently being edited.
- `offset`: current pagination page/group.
- `limit`: number of tasks per API call.

## 32. Getting Token In Home

Home gets token from Redux:

```ts
const token = useSelector(
  (state: RootState) => state.auth.token
);
```

Meaning:

Home needs token for task APIs.

When calling APIs, current code uses:

```ts
token!
```

The `!` tells TypeScript:

Trust me, token is not null here.

This is okay here because Home is protected by `ProtectedRoute`.

## 33. Fetch Tasks

Function:

```ts
const fetchTasks = async () => {
  try {
    const response = await getPaginatedTasks(
      offset,
      limit,
      token!
    );

    if (response) {
      setTasks(
        response.data.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.due_date,
          image: task.image_path,
        }))
      );
    }
  } catch (error) {
    console.log(error);
  }
};
```

Step by step:

1. Calls paginated task API.
2. Sends `offset`, `limit`, and token.
3. Gets tasks from backend.
4. Converts backend task format to frontend task format.

Backend uses:

```txt
due_date
image_path
```

Frontend uses:

```txt
dueDate
image
```

That is why mapping is needed.

## 34. useEffect For First Load

At the bottom of Home:

```ts
useEffect(() => {
  fetchTasks();
}, []);
```

Meaning:

When Home opens for the first time, fetch tasks.

The empty array:

```ts
[]
```

means run only once after the component loads.

## 35. Load More

Function:

```ts
const handleLoadMore = async () => {
  try {
    const nextPage = offset + 1;

    const response = await getPaginatedTasks(
      nextPage,
      limit,
      token!
    );

    if (response) {
      setTasks((prevTasks) => [
        ...prevTasks,
        ...response.data.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.due_date,
          image: task.image,
        })),
      ]);

      setOffset(nextPage);
    }
  } catch (error) {
    console.log(error);
  }
};
```

Step by step:

1. Creates `nextPage` by adding `1` to offset.
2. Calls backend for next group of tasks.
3. Adds new tasks after old tasks.
4. Updates offset.

This line keeps old tasks and adds new tasks:

```ts
setTasks((prevTasks) => [
  ...prevTasks,
  ...newTasks
]);
```

## 36. Create Task

Function:

```ts
const handleCreateTask = async () => {
  try {
    const taskData = {
      title,
      description,
      status,
      due_date: dueDate,
    };

    await createTask(taskData, token!);

    fetchTasks();

    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
  } catch (error) {
    console.log(error);
  }
};
```

Step by step:

1. Takes values from form state.
2. Creates `taskData`.
3. Sends data to backend.
4. Calls `fetchTasks()` to refresh list.
5. Clears the form.

Important:

Frontend state name is:

```txt
dueDate
```

Backend expects:

```txt
due_date
```

So create task sends:

```ts
due_date: dueDate
```

## 37. Delete Task

Function:

```ts
const handleDelete = async (id: number) => {
  try {
    await deleteTask(id, token!);

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  } catch (error) {
    console.log(error);
  }
};
```

Step by step:

1. Sends delete request to backend.
2. Removes task from frontend list.

This line removes the deleted task:

```ts
prevTasks.filter((task) => task.id !== id)
```

It means:

Keep all tasks except the task with this id.

## 38. Edit Task

Function:

```ts
const handleEdit = (task: Task) => {
  setEditTask(task);
};
```

Meaning:

When user clicks Edit, that task is stored in `editTask`.

Then the UI checks:

```tsx
editTask?.id === task.id
```

If true, show edit inputs.

If false, show normal task view.

## 39. Update Task

Function:

```ts
const handleUpdate = async () => {
  if (!editTask) return;

  try {
    const taskData = {
      title: editTask.title,
      description: editTask.description,
      status: editTask.status,
      due_date: editTask.dueDate,
    };

    await updateTask(
      editTask.id,
      taskData,
      token!
    );

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTask.id
          ? editTask
          : task
      )
    );

    setEditTask(null);
  } catch (error) {
    console.log(error);
  }
};
```

Step by step:

1. If no task is being edited, stop.
2. Create updated task data.
3. Send update API request.
4. Replace old task in frontend list.
5. Close edit mode by setting `editTask` to `null`.

This line replaces only the updated task:

```ts
task.id === editTask.id ? editTask : task
```

Meaning:

If this is the edited task, use the new version.

Otherwise, keep the old task.

## 40. Image Upload

Function:

```ts
const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  taskId: number
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    const updatedTask = await uploadImage(
      taskId,
      file,
      token!
    );

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            image: `${updatedTask.task.image_path}`,
          }
          : task
      )
    );
  } catch (error) {
    console.log(error);
  }
};
```

Step by step:

1. User chooses a file.
2. Browser stores selected file in `e.target.files`.
3. Code takes the first file:

```ts
const file = e.target.files?.[0];
```

4. If no file exists, stop.
5. Upload image to backend.
6. Backend returns updated task.
7. Frontend updates the task image path.

## 41. Delete Image From Frontend View

Function:

```ts
const handleDeleteImage = (taskId: number) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId
        ? { ...task, image: null }
        : task
    )
  );
};
```

Meaning:

This removes the image from frontend state.

Important:

This current function does not call backend delete image API.

It only hides/removes the image from the UI state.

## 42. Home UI Flow

The Home UI has:

1. Page title:

```tsx
<h1>My Tasks</h1>
```

2. Create task form:

- title input
- description textarea
- status dropdown
- due date input
- Add Task button

3. Task list:

Each task card shows:

- title
- description
- status
- due date
- Delete button
- Edit button
- file input for image upload
- image preview if image exists

4. Load More button:

Loads next group of tasks.

## 43. Full User Flow

### Signup Flow

1. User opens `/signup`.
2. User enters name, email, password.
3. User clicks Sign Up.
4. `signUp()` API is called.
5. Backend creates user.
6. Backend returns token.
7. Token is saved in Redux.
8. Redux Persist saves token in local storage.

### Login Flow

1. User opens `/`.
2. User enters email and password.
3. User clicks Login.
4. `login()` API is called.
5. Backend checks user.
6. Backend returns token.
7. Token is saved in Redux.
8. User is navigated to `/home`.

### Protected Home Flow

1. User opens `/home`.
2. `ProtectedRoute` checks Redux token.
3. If token exists, Home page opens.
4. If token does not exist, user goes to `/`.

### Create Task Flow

1. User fills create task form.
2. User clicks Add Task.
3. `handleCreateTask()` runs.
4. `createTask()` API sends data to backend.
5. `fetchTasks()` refreshes task list.
6. Form becomes empty again.

### Read Task Flow

1. Home page loads.
2. `useEffect()` runs.
3. `fetchTasks()` calls paginated tasks API.
4. Backend returns tasks.
5. Tasks are saved in React state.
6. Tasks show on screen.

### Update Task Flow

1. User clicks Edit.
2. Task becomes editable.
3. User changes values.
4. User clicks Update.
5. `updateTask()` API sends data to backend.
6. Frontend updates task in state.
7. Edit mode closes.

### Delete Task Flow

1. User clicks Delete.
2. `deleteTask()` API sends delete request.
3. Frontend removes task from list.

### Upload Image Flow

1. User chooses image file.
2. `handleImageUpload()` gets file.
3. `uploadImage()` sends `FormData` to backend.
4. Backend stores image.
5. Backend returns image path.
6. Frontend shows image.

## 44. API Summary Table

| Purpose | Method | Endpoint | Function |
|---|---|---|---|
| Signup | POST | `/api/auth/signup` | `signUp` |
| Login | POST | `/api/auth/login` | `login` |
| Get tasks | GET | `/api/tasks` | `getTasks` |
| Create task | POST | `/api/tasks` | `createTask` |
| Delete task | DELETE | `/api/tasks/:id` | `deleteTask` |
| Update task | PUT | `/api/tasks/:id` | `updateTask` |
| Get paginated tasks | GET | `/api/tasks/paginated?offset=1&limit=5` | `getPaginatedTasks` |
| Upload image | POST | `/api/tasks/:id/image` | `uploadImage` |

## 45. Important Backend Response Shapes Used

Login expects token in one of these places:

```ts
response.data.token
response.data.accessToken
response.data.data?.token
response.data.user?.token
```

Paginated task response expects:

```ts
response.data.tasks
```

Each backend task is expected to have:

```ts
task.id
task.title
task.description
task.status
task.due_date
task.image_path
```

Image upload response expects:

```ts
updatedTask.task.image_path
```

## 46. How Authorization Works

After login, backend gives a token.

Frontend saves the token.

For protected task APIs, frontend sends token in request headers:

```ts
headers: {
  Authorization: `Bearer ${token}`,
}
```

Example:

```txt
Authorization: Bearer abc123
```

Backend reads this token and decides if the user is allowed.

## 47. Local Storage And Redux Persist

Without Redux Persist:

- Login token stays only in memory.
- If page refreshes, token disappears.
- User may be logged out.

With Redux Persist:

- Token is saved in browser local storage.
- If page refreshes, token comes back.
- User can stay logged in.

In this project:

```ts
const persistedReducer = persistReducer(
  persistConfig,
  authReducer
);
```

This saves auth state.

## 48. How To Recreate This Project Step By Step

### Step 1: Create Vite React TypeScript App

```bash
npm create vite@latest taskTracker-frontend
cd taskTracker-frontend
npm install
```

### Step 2: Install Needed Packages

```bash
npm install axios react-router-dom @reduxjs/toolkit react-redux redux-persist tailwindcss @tailwindcss/vite
```

### Step 3: Create `.env`

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Step 4: Setup Tailwind In `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
```

### Step 5: Setup Tailwind In `src/index.css`

```css
@layer theme, custom-base, custom-components, custom-utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(custom-base);
@import "tailwindcss/utilities.css" layer(custom-utilities);
```

### Step 6: Create Folders

Inside `src`, create:

```txt
components
pages
redux
redux/features
lib
lib/api
lib/api/auth
lib/api/task
lib/utils
lib/utils/apiEndPoints
```

### Step 7: Create API Endpoints File

Create:

```txt
src/lib/utils/apiEndPoints/apiEndPoints.ts
```

Add endpoints:

```ts
const apiEndpoints = {
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  GET_TASKS: "/api/tasks",
  CREATE_TASK: "/api/tasks",
  DELETE_TASK: "/api/tasks",
  UPDATE_TASK: "/api/tasks",
  PAGIATED: "/api/tasks/paginated"
}

export default apiEndpoints
```

### Step 8: Create Auth API

Create:

```txt
src/lib/api/auth/api.ts
```

Add signup and login functions using Axios.

### Step 9: Create Task API

Create:

```txt
src/lib/api/task/api.ts
```

Add functions:

- `getTasks`
- `createTask`
- `deleteTask`
- `updateTask`
- `getPaginatedTasks`
- `uploadImage`

### Step 10: Create Auth Slice

Create:

```txt
src/redux/features/authSlice.ts
```

Add:

- `token` state.
- `setToken` reducer.
- `clearToken` reducer.

### Step 11: Create Redux Store

Create:

```txt
src/redux/store.ts
```

Add:

- `configureStore`
- `persistReducer`
- `persistStore`
- local storage setup
- `RootState` type
- `AppDispatch` type

### Step 12: Wrap App In Redux And Router

Edit:

```txt
src/main.tsx
```

Wrap app with:

- `Provider`
- `PersistGate`
- `BrowserRouter`

### Step 13: Create Protected Route

Create:

```txt
src/components/ProtectedRoute.tsx
```

It should:

- read token from Redux
- redirect to `/` when token is missing
- show children when token exists

### Step 14: Create Login Component

Create:

```txt
src/components/login.tsx
```

It should:

- collect email and password
- call `login()` API
- get token from response
- dispatch `setToken(token)`
- navigate to `/home`

### Step 15: Create Signup Component

Create:

```txt
src/components/signUp.tsx
```

It should:

- collect name, email, password
- call `signUp()` API
- get token from response
- dispatch `setToken(token)`

### Step 16: Create Home Component

Create:

```txt
src/components/Home.tsx
```

It should:

- get token from Redux
- fetch tasks on page load
- create task
- delete task
- edit task
- update task
- upload image
- load more tasks

### Step 17: Create Pages

Create:

```txt
src/pages/signUpPage.tsx
src/pages/loginPage.tsx
```

Use them to return the component.

### Step 18: Create Routes

Edit:

```txt
src/App.tsx
```

Add:

```tsx
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
</Routes>
```

### Step 19: Run The App

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

## 49. Common Mistakes And Fixes

### Mistake: API base URL is undefined

Check `.env`.

It must be:

```env
VITE_API_BASE_URL=http://localhost:5000
```

After changing `.env`, restart frontend:

```bash
npm run dev
```

### Mistake: Protected route always goes to login

Check if token is saved:

```ts
dispatch(setToken(token));
```

Also check if backend login response really sends token.

### Mistake: Task APIs fail with unauthorized error

Check if token is sent:

```ts
headers: {
  Authorization: `Bearer ${token}`,
}
```

### Mistake: Due date does not show correctly

Backend sends:

```txt
due_date
```

Frontend uses:

```txt
dueDate
```

So mapping must be correct.

### Mistake: Image does not show

Current image src is:

```tsx
src={`http://localhost:5000${task.image}`}
```

So `task.image` should be something like:

```txt
/uploads/image-name.jpg
```

Full image URL becomes:

```txt
http://localhost:5000/uploads/image-name.jpg
```

### Mistake: Page refresh logs user out

Check Redux Persist setup:

```tsx
<PersistGate loading={null} persistor={persistor}>
```

And check store has:

```ts
persistReducer(...)
persistStore(store)
```

## 50. Simple Mental Model

Here is the whole app in simple words:

1. User logs in.
2. Backend gives token.
3. Redux stores token.
4. Redux Persist saves token in local storage.
5. ProtectedRoute uses token to protect `/home`.
6. Home uses token to call task APIs.
7. API files use Axios to talk to backend.
8. Task data comes from backend and is shown on screen.
9. User can create, update, delete, load more, and upload images.

## 51. Current File Responsibility Summary

| File | Job |
|---|---|
| `.env` | Stores backend base URL |
| `vite.config.ts` | Adds React and Tailwind plugins |
| `src/main.tsx` | Starts React app and wraps providers |
| `src/App.tsx` | Defines routes |
| `src/index.css` | Imports Tailwind and global styles |
| `src/redux/store.ts` | Creates Redux store and persistence |
| `src/redux/features/authSlice.ts` | Stores token and clears token |
| `src/lib/utils/apiEndPoints/apiEndPoints.ts` | Stores backend endpoint paths |
| `src/lib/api/auth/api.ts` | Signup and login API calls |
| `src/lib/api/task/api.ts` | Task API calls |
| `src/components/ProtectedRoute.tsx` | Protects private pages |
| `src/components/login.tsx` | Login form and login logic |
| `src/components/signUp.tsx` | Signup form and signup logic |
| `src/components/Home.tsx` | Task dashboard and task actions |
| `src/pages/signUpPage.tsx` | Signup page wrapper |
| `src/pages/loginPage.tsx` | Login page wrapper |

## 52. Final Checklist For Creating Same Type Of Project

Before saying project is ready, check:

- Project runs with `npm run dev`.
- `.env` has correct backend URL.
- Tailwind classes work.
- Routes work.
- Signup API works.
- Login API returns token.
- Token is stored in Redux.
- Token stays after refresh.
- `/home` is protected.
- Create task works.
- Fetch tasks works.
- Load More works.
- Update task works.
- Delete task works.
- Image upload works.
- Image preview works.

That is the full frontend journey from scratch to the current Task Tracker frontend.
