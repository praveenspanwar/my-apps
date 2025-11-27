# Site-Ops Studio

A Sitecore Marketplace app built with Next.js that allows creating and managing SitecoreAI sites. The app appears full screen in SitecoreAI – Portfolio (Sites) and leverages the SitecoreAI Sites REST API. Automates the process of building a site for ideation to creation and deployment.

## Features

- **Full-Screen SitecoreAI Integration**: Designed to run fullscreen within SitecoreAI's Sites interface
- **Site Management**: Create, view, and manage Sitecore sites.
- **Template Selection**: Choose from multiple site templates when creating new sites
- **Real-time Synchronization**: Uses XM Cloud APIs for seamless site management
- **Professional UI**: Modern, intuitive interface built with shadcn components and Tailwind CSS
- **Type-Safe**: Built with TypeScript for robust development
- **Marketplace SDK Integration**: Full integration with Sitecore Marketplace SDK and XMC module

## Project Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd my-sites-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Architecture

### Components

- **SitesManager**: Main orchestrator managing sites list and creation workflow
- **Header**: Navigation bar with "Create Site" button using shadcn Button
- **SitesList**: Grid display of existing sites with empty state handling
- **SiteCard**: Individual site card built with shadcn Card and Badge components
- **CreateSiteDialog**: Modal dialog for creating new sites using shadcn Dialog, Input, Label, and RadioGroup
- **LoadingSpinner**: Loading indicator for async operations

### Hooks & Utilities

- **useXmc**: Custom hook for XMC context (client, appContext, isInitialized)
- **useMarketplaceClient**: Access to initialized Marketplace SDK client
- **useAppContext**: Access to application context with resource access
- **useSitesApi**: API integration hook for sites operations:
  - `listSites()`: Fetch all sites via XMC API
  - `getSiteTemplates()`: Fetch available site templates
  - `createSite()`: Create new site via XMC API

### UI Components (shadcn)

- **Button**: Flexible button with multiple variants and sizes
- **Card**: Container components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- **Dialog**: Modal dialog with Radix UI primitives
- **Input**: Form input field
- **Badge**: Status indicators with variants
- **Label**: Form label component
- **RadioGroup**: Radio button group for template selection

### API Integration

The app integrates with XM Cloud APIs through the Marketplace SDK:

- **Sites REST API**: Access via `xmc.xmapp.listSites` and `xmc.xmapp.createSite` operations
- **Site Templates**: Fetch templates using `xmc.xmapp.listSiteTemplates`
- **Authentication**: Built-in SDK authentication using application context
- **Error Handling**: Graceful fallbacks with mock data when API calls fail

The API layer is abstracted through `useSitesApi` hook with automatic error handling and type safety.

## Technologies

- **Next.js 15.5.6**: React framework for production
- **React 19.1.0**: UI library
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Pre-built, accessible component library
- **Radix UI**: Headless UI primitives for components
- **Lucide React**: Icon library
- **class-variance-authority**: CSS class composition
- **clsx & tailwind-merge**: Utility functions for class names
- **Sitecore Marketplace SDK**:
  - `@sitecore-marketplace-sdk/client`: Client library
  - `@sitecore-marketplace-sdk/xmc`: XMC-specific utilities

## Configuration

### Environment Variables

Create a `.env.local` file in the project root with necessary configuration:

```env
NEXT_PUBLIC_XM_CLOUD_ENVIRONMENT=your_environment_id
NEXT_PUBLIC_XM_CLOUD_API_KEY=your_api_key
```

## Development

### Code Structure

```
my-sites-app/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main page entry point
│   └── globals.css          # Global styles with CSS variables
├── components/              # React components
│   ├── providers.tsx        # XMC Provider wrapper with ClientSDK
│   ├── sites-manager.tsx    # Main orchestrator component
│   ├── header.tsx           # Header with navigation
│   ├── sites-list.tsx       # Sites grid container
│   ├── site-card.tsx        # Individual site card (shadcn)
│   ├── create-site-dialog.tsx # Dialog for creating sites (shadcn)
│   ├── loading-spinner.tsx  # Loading indicator
│   └── ui/                  # shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── label.tsx
│       └── radio-group.tsx
├── lib/                     # Utility functions
│   ├── useSitesApi.ts      # Sites API integration hook
│   └── utils.ts            # Helper functions (cn)
├── components.json          # shadcn configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS with CSS variables
├── postcss.config.mjs       # PostCSS configuration
└── package.json            # Project dependencies
```

### Key Hooks

**useXmc** - Access XMC context:
```typescript
const { client, appContext, isInitialized } = useXmc();
```

**useSitesApi** - Access sites operations:
```typescript
const { listSites, getSiteTemplates, createSite, loading, error } = useSitesApi();
```

## Next Steps

1. **Register App in Cloud Portal**: 
   - Go to Developer Studio in Sitecore Cloud Portal
   - Create a new Custom App
   - Select "Full Screen" extension point
   - Set deployment URL to `http://localhost:3000` for local development

2. **Configure XM Cloud Authentication**: 
   - Set up proper authentication with your XM Cloud instance
   - Ensure API access is enabled for XM Cloud APIs

3. **Enhance API Integration**: 
   - Complete the `createSite` mutation implementation if needed
   - Add error recovery mechanisms
   - Implement retry logic for failed requests

4. **Improve Error Handling**: 
   - Add user-friendly error notifications
   - Implement error boundaries for React components
   - Add logging for debugging

5. **Add Features**:
   - Site deletion functionality
   - Site editing capabilities
   - Site search and filtering
   - Pagination for large site lists

6. **Testing**: 
   - Add unit tests for components
   - Add integration tests for API calls
   - Add E2E tests for user workflows

7. **Deployment**: 
   - Deploy to your preferred hosting platform (Vercel, Azure, etc.)
   - Set up environment variables for production
   - Configure CDN for static assets

## Support

For issues or questions about:
- **Sitecore Marketplace SDK**: Refer to the [official documentation](https://developers.sitecore.com/learn/getting-started/marketplace)
- **shadcn/ui**: Check the [shadcn/ui documentation](https://ui.shadcn.com)
- **Next.js**: Visit [Next.js docs](https://nextjs.org/docs)
- **Tailwind CSS**: See [Tailwind CSS docs](https://tailwindcss.com/docs)

## Contributing

When making changes to this project:
1. Ensure all components use shadcn/ui components
2. Maintain type safety with TypeScript
3. Follow the existing code structure
4. Test in the XMC environment before deploying
5. Update this README with any significant changes
