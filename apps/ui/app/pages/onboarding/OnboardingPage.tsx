import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { Link, useFetcher, useParams } from "@remix-run/react";
import { BookOpen, KeyRound, LayoutDashboard } from "lucide-react";
import { FC, ReactNode } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { ApiKeysDialogContent } from "~/components/dialogs/ApiKeys/ApiKeysDialogContent";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { RSHTheme } from "~/constants/RSHThemes";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { Routes } from "~/routes";
import { sortApiKeys } from "~/utils/sorters";
import { PageLayout } from "../layouts/PageLayout";
import { ENV_SNIPPET, MONTELO_CODE_SNIPPET } from "./constants";

const breadcrumbs: LayoutBreadcrumb[] = [
  {
    label: "Onboarding",
  },
];

const subtitle = () => (
  <PageSubtitle>
    Getting started with Montelo! <PageDocLink to={Routes.external.docs.quickstart}>Quickstart Docs.</PageDocLink>
  </PageSubtitle>
);

type StepComponentProps = {
  step: number;
  title: string;
  isLast?: boolean;
  children: ReactNode;
};
const StepComponent: FC<StepComponentProps> = ({ step, children, isLast, title }) => {
  const lastStepStyling = isLast ? "text-2xl" : "bg-slate-200 dark:bg-slate-800 text-sm";
  return (
    <div className="flex min-h-10">
      <div className="mr-4 flex max-w-6 flex-1 flex-col items-center gap-3">
        <div className={`flex h-6 w-6 items-center justify-center rounded-xl ${lastStepStyling}`}>
          {isLast ? "🎉" : step}
        </div>
        {!isLast && <div className="h-full w-[1px] flex-1 bg-slate-200 dark:bg-slate-800" />}
      </div>
      <div className="-mt-[2px] flex flex-1 flex-col gap-2 pb-5">
        <h1 className="font-semibold">{title}</h1>
        <div className="text-muted-foreground flex flex-col gap-1 text-sm">{children}</div>
      </div>
    </div>
  );
};

export const OnboardingPage: FC = () => {
  const fetcher = useFetcher<ApiKeyWithEnvDto[]>();
  const params = useParams();
  const projectId = params.projectId!;
  const envId = params.envId!;

  const prefetchApiKeys = () => fetcher.load(Routes.actions.project.getAllApiKeys(projectId));
  const sortedEnvironments = sortApiKeys(fetcher.data || []);

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle}>
      <div className="flex flex-col gap-3 p-6">
        <StepComponent step={1} title="Get your API Keys">
          <p>Reveal and copy your API keys:</p>

          <Dialog>
            <DialogTrigger asChild onMouseEnter={prefetchApiKeys}>
              <Button variant="outline" className="my-2 flex w-40 gap-2">
                <KeyRound className={"text-muted-foreground h-4 w-4"} />
                Get API Keys
              </Button>
            </DialogTrigger>
            <ApiKeysDialogContent sortedEnvironments={sortedEnvironments} projectId={projectId} />
          </Dialog>
        </StepComponent>

        <StepComponent step={2} title="Install the SDK">
          Install the montelo SDK using npm in your project directory:
          <SyntaxHighlighter style={RSHTheme} language="shell">
            {"$ npm install montelo"}
          </SyntaxHighlighter>
          <code></code>
        </StepComponent>

        <StepComponent step={3} title="Create Env File">
          Create a .env file in the root of your project:
          <SyntaxHighlighter style={RSHTheme} language="shell">
            {ENV_SNIPPET}
          </SyntaxHighlighter>
          <code></code>
        </StepComponent>

        <StepComponent step={4} isLast title="Start using Montelo!">
          <p>
            Initialise your montelo client and start logging to Montelo!
            <SyntaxHighlighter style={RSHTheme} language="typescript">
              {MONTELO_CODE_SNIPPET}
            </SyntaxHighlighter>
          </p>
        </StepComponent>

        <div className="flex w-full justify-center gap-4">
          <Link to={Routes.external.docs.quickstart}>
            <Button variant="outline" size="lg" className="flex h-10 w-60 gap-3">
              <BookOpen size={20} />
              Read Documentation
            </Button>
          </Link>
          <Link to={Routes.app.project.env.dashboard({ projectId, envId })}>
            <Button variant="default" size="lg" className="flex h-10 w-60 gap-3">
              <LayoutDashboard size={20} />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
