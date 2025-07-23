// src/components/ui/toaster.jsx
import { useToast } from "@/components/ui/toaster";
import { useCallback } from "react";

// Chakra-compatible toaster hook
export function useCustomToaster() {
  const toast = useToast();

  const create = useCallback(({ title, description, status = "info" }) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }, [toast]);

  return { create };
}

// Optional <Toaster /> component for API compatibility
export function Toaster() {
  return null; // Chakra's toasts don't need a renderer component
}
