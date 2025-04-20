"use client";

import { useState, useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Wait for client-side hydration to be complete
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // During server-side rendering, just render the children
  // This prevents hydration errors with auth context
  if (!isMounted) {
    return <>{children}</>;
  }
  
  // Once mounted on the client, render the children
  return <>{children}</>;
}