export const QUESTIONS = [
  {
    id: 1,
    question: 'What is the primary purpose of React?',
    options: [
      'To manage the database',
      'To handle HTTP requests',
      'To build user interfaces',
      'To style web pages',
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question:
      'Which method is used to update state in a React class component?',
    options: ['setState()', 'updateState()', 'changeState()', 'modifyState()'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: 'What does the useState hook in React do?',
    options: [
      'Handles side effects',
      'Manages state in a functional component',
      'Defines a lifecycle method',
      'Performs API calls',
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      'Which of the following is NOT a lifecycle method in React class components?',
    options: [
      'componentDidMount',
      'componentWillUpdate',
      'componentWillUnmount',
      'useEffect',
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: 'What is JSX?',
    options: [
      'A JavaScript library',
      'A tool for styling React components',
      'A syntax extension for JavaScript',
      'A data-fetching library',
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "What is the purpose of React's key prop?",
    options: [
      'To set unique IDs for components',
      'To add event listeners',
      'To optimize rendering performance of lists',
      'To pass props to child components',
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "Which statement best describes React's Virtual DOM?",
    options: [
      'It is a copy of the real DOM that React updates directly.',
      'It is a lightweight representation of the real DOM used for performance optimization.',
      'It is a database for storing DOM elements.',
      'It is a library used to manage DOM manipulations.',
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question:
      'Which hook is used to perform side effects in functional components?',
    options: ['useState', 'useEffect', 'useReducer', 'useContext'],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: 'What is React.Fragment used for?',
    options: [
      'To define a part of the Redux store',
      'To group multiple elements without adding extra nodes to the DOM',
      'To handle forms',
      'To optimize application performance',
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: 'Which command is used to create a new React app?',
    options: [
      'npm create react-app my-app',
      'npm init react-app my-app',
      'npx create-react-app my-app',
      'react-cli create my-app',
    ],
    correctAnswer: 0,
  },
];
