"use client";

import ProtectedRoute from "@/app/Components/ProtectedRoute";
import DynamicPageAnalyzer from "@/app/Components/Diagrams/DynamicPageAnalyzer";

const PageAnalyzerPage = () => {
  return (
    <ProtectedRoute>
      <DynamicPageAnalyzer />
    </ProtectedRoute>
  );};

export default PageAnalyzerPage;