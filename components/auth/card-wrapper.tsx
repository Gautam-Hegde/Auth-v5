"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CradWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CradWrapperProps) => {
  return (
  <Card className="w-[400px]  shadow-lg">
    <CardHeader>
      <Header label={headerLabel} />
    </CardHeader>
    <CardContent>
    {children}
    </CardContent>
    {showSocial && (
      <CardFooter>
        <Social/>
      </CardFooter>
    )}
    <CardFooter>
      <BackButton
      label={backButtonLabel}
      href={backButtonHref}
      
      />

      
    </CardFooter>
  
  </Card>);
};
