# Labosaurus

**Labosaurus** provides interactive features to Docusaurus, useful for training purposes.  
  
✨ **[Live demo here!](https://lab.jaouan.dev/docs/hidden)**, or ([with Google authentication](https://lab.jaouan.dev/docs/hidden?enableAuth)), or ([with fake authentication](https://lab.jaouan.dev/docs/hidden?mockAuth))  
🧪 **[Lab example here!](https://lab.jaouan.dev/fake-lab/example)**, or ([with Google authentication](https://lab.jaouan.dev/fake-lab/example?enableAuth)), or ([with fake authentication](https://lab.jaouan.dev/fake-lab/example?mockAuth))  

  
## How to install
Install Labosaurus :
```bash
npm install @jaouan/labosaurus
```

Inside your Docusaurus repository, create a file `src/theme/Root.tsx` (or `jsx`) :
```jsx
import { GoogleLogin, LabosaurusRoot, firebaseAuthProvider, firebaseStoreProvider } from '@jaouan/labosaurus';

// If you want to use Firebase. You can use something else if you want.
import * as firebase from 'firebase/app';
export const app = firebase.initializeApp(... firebaseConfig ...);

export default function Root({ children }) {
  return (
    <LabosaurusRoot
      config={{
        storeProvider: firebaseStoreProvider(app), // Uses Firestore to display/hide Hidden blocks.
        authProvider: firebaseAuthProvider(app), // Uses Firebase auth.
        loginComponent: () => <GoogleLogin /> // Displays a "Sign in with Google" button.
      }}
    >
      {children}
    </LabosaurusRoot>
  );
}
```

## Features
### Slide mode
Adds a space before each title to facilitate presentation.
Enable it by pressing `Option+Shift+S`.
![labosaurus-slide-demo](https://github.com/Jaouan/labosaurus/assets/7120207/9587733e-e273-46eb-a2a8-7edc55a7d3dd)


### Hidden block
Allows to hide/show content from all readers in realtime.  
Can be plugged to any realtime sources, such as Firestore, your own API or anything else.
  
![labosaurus-hidden-demo](https://github.com/Jaouan/labosaurus/assets/7120207/d5dcfc90-aea5-4b53-97a3-fb0f07198fae)
  
Only administrator can show/hide hidden blocks.  
If you use firebase, Labosaurus will access to your Firestore to fetch user information. You have to create a collection `users`. Inside create a document with user's email as id, and a field `admin: true`. Ensure to secure your collection.

Parameters :
- **until** : The sequential number of the block. Displaying a block with `until=N` will display all blocks `<N` of the current group.
- **group** (optional) : Hidden block group (`default` by default).
- **label** (optional) : Hidden label.
  
```mdx
import { Hidden } from "@jaouan/labosaurus";

<Hidden until={100}>
... Content ...
</Hidden>

<Hidden until={101}>
If I'm visible, the previous block is also visible.
</Hidden>

<Hidden group="foo" until={1} label="I'm hidden">
I'm in my own group. I'm not affected by others blocks.
</Hidden>
```

Use Firestore to get realtime synchronization :
```jsx
export default function Root({ children }) {
  return (
    <LabosaurusRoot
      config={{
        ...
        storeProvider: firebaseStoreProvider(app),
      }}
    >
      {children}
    </LabosaurusRoot>
  );
}
```
... or anything else :
```jsx
<LabosaurusRoot
    config={{
    ...
    storeProvider: {
        dispatch: ...
        get: ...
        subscribe: ...
    },
    }}
>
    {children}
</LabosaurusRoot>
```

### Hint
Displays a hint.  
![labosaurus-hint-demo](https://github.com/Jaouan/labosaurus/assets/7120207/086b5179-27c2-4b2f-b1b1-b019e73d4f7e)
  
```mdx
import { Hint } from "@jaouan/labosaurus";

<Hint>A hint</Hint>
```

### Question
Displays a simple question.  
Answer cannot be seen in the DOM, but could be found in sources (not easily).  
  
![labosaurus-question-demo](https://github.com/Jaouan/labosaurus/assets/7120207/c122aa4d-f657-47c9-a2c2-4ce7bb3e3e28)
  
Parameters :
- **label** : The... label.
- **answer** : The... answer. It can be a string, or an object with details. Details is displayed after the user made his choice.
- **wrongAnswers** : An array of wrong answers. It can be a string, or an object with details.
- **randomize** (optional) : Randomize answers (`false` by default).
  
```mdx
import { SimpleQuestion } from "@jaouan/labosaurus";

<SimpleQuestion
  label="🫵 What's the weather like today?"
  answer="Sunny"
  wrongAnswers={["Cloudy", "Rainy"]}
/>

<SimpleQuestion
  label="🫵 What's the weather like today?"
  answer={{
    label: "Sunny",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }}
  wrongAnswers={[
    {
      label: "Cloudy",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      label: "Rainy",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]}
  randomize={true}
/>
```

### Authentication
By using `LabosaurusRoot`, the user will be prompted to authenticate.  
**You can use anything you want to authenticate.**  
Labosaurus provides a Firebase authentication (Google oAuth), but you can highly customize authentication and use others access manager, or your own API, or nothing.
![labosaurus-signin-google](https://github.com/Jaouan/labosaurus/assets/7120207/e777263c-07e8-4436-a87a-00afa8ae6377)

  
Using Firebase :
```jsx
import * as firebase from 'firebase/app';
import { LabosaurusRoot, GoogleLogin, firebaseAuthProvider } from '@jaouan/labosaurus';

export const app = firebase.initializeApp({ /* firebase config */ });

export default function Root({ children }) {
  return (
    <LabosaurusRoot
      config={{
        authProvider: firebaseAuthProvider(app), // Uses Firebase auth.
        loginComponent: () => <GoogleLogin /> // Displays a "Sign in with Google" button.
        ...
      }}
    >
      {children}
    </LabosaurusRoot>
  );
}
```
... or anything else :
```jsx
<LabosaurusRoot
    config={{
    authProvider: {
        login: async () => { ... },
        logout: async () => { ... },
        isAdmin: async () => { return true|false },
        getUser: () => { return "string"|undefined; },
        onUser: (callback) => { // Labosaurus subscribes to user login/logout.
        ...
        callback(user); // Triggers callback immediately.
        return unsubscribeFunction;
        }
    },
    loginComponent: () => {
        const { authProvider } = useContext<LabosaurusConfig>(LabosaurusContext);
        return <button onClick={authProvider.login}>Login</button>;
    }
    }}
>
    {children}
</LabosaurusRoot>
```
