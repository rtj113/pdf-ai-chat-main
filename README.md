# Platika PDF - AI-Powered Document Assistant

## Project Overview

Platika PDF is an innovative AI-powered platform that revolutionizes how professionals interact with PDF documents. By leveraging advanced AI models, it offers intelligent document analysis, rapid information retrieval, and an interactive chat interface for document queries.

### Key Features

- Seamless PDF document upload and secure storage
- AI-powered document analysis and content extraction
- Interactive chat interface for natural language document queries
- Tiered subscription model with free and premium access levels
- Robust document handling with secure user authentication
- Responsive design for optimal user experience across devices

## Technology Stack

- **Frontend**: Next.js 14 with React and TypeScript
- **Styling**: Tailwind CSS with custom components
- **Backend**: Next.js API routes and server actions
- **Database**: Firebase Firestore
- **File Storage**: Firebase Storage
- **Authentication**: Clerk
- **AI/ML**: OpenAI GPT models via LangChain
- **Vector Database**: Pinecone
- **Payment Processing**: Stripe

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git
- Accounts for:
  - Firebase
  - Pinecone
  - OpenAI
  - Clerk
  - Stripe

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KVBuilds/pdf-ai-chat.git
   cd platika-pdf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   OPENAI_API_KEY=your_openai_api_key

   PINECONE_API_KEY=your_pinecone_api_key

   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_CLIENT_ID=your_firebase_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=your_firebase_client_cert_url
   FIREBASE_UNIVERSE_DOMAIN=googleapis.com

   STRIPE_API_KEY=your_stripe_api_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Firebase Setup:
   - Create a Firebase project and enable Firestore and Storage
   - Download the service account key and use its values in the `.env.local` file
   - Update the Firebase configuration in `firebase.ts`:

   ```typescript:firebase.ts
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

5. Pinecone Setup:
   - Create a Pinecone project and index
   - Update the index name in `lib/langchain.ts` if necessary:

   ```typescript:lib/langchain.ts
   export const indexName = "your_index_name"
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/app`: Next.js 14 app directory
  - `/dashboard`: User dashboard and file management
  - `/about`: About page
  - `/pricing`: Pricing information
- `/components`: Reusable React components
- `/lib`: Utility functions and third-party service configurations
- `/hooks`: Custom React hooks
- `/actions`: Server actions for server-side logic
- `/public`: Static assets

## Key Components and Functionality

### Document Upload and Processing

The `FileUploader` component (`components/FileUploader.tsx`) handles document uploads:
- Accepts PDF files via drag-and-drop or file selection
- Uploads files to Firebase Storage
- Generates embeddings using OpenAI and stores them in Pinecone

### Chat Interface

The `Chat` component (`components/Chat.tsx`) provides the interactive chat functionality:
- Renders chat messages
- Handles user input and AI responses
- Integrates with the AI backend for document querying

### AI Integration

The `lib/langchain.ts` file sets up the OpenAI model and Pinecone vector store:
- Configures the ChatOpenAI model
- Sets up the Pinecone vector store for efficient querying
- Implements the chat chain for processing user queries

### Authentication and User Management

Clerk is used for authentication, configured in `app/layout.tsx`:
- Wraps the application with `ClerkProvider`
- Manages user sessions and authentication state

### Database and Storage

Firebase Admin SDK (`firebaseAdmin.ts`) is used for server-side operations:
- Initializes Firestore for document metadata storage
- Sets up Firebase Storage for PDF file storage

### Payment Integration

Stripe handles payments and subscriptions:
- `lib/stripe.ts`: Server-side Stripe operations
- `lib/stripe-js.ts`: Client-side Stripe integration
- `app/webhook/route.ts`: Webhook handler for Stripe events

## Styling

Tailwind CSS is used for styling, with global styles in `app/globals.css`. Custom components are built using a combination of Tailwind classes and custom CSS.

## Deployment

The project is optimized for deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel project settings
3. Deploy the project

Ensure all API keys and environment variables are properly set in Vercel's project settings.

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please read our `CONTRIBUTING.md` file for our code of conduct and detailed submission guidelines.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository or contact our support team at support@wiesgroup.com.