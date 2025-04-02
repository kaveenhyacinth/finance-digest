import { Spinner } from "@heroui/spinner";

export const GlobalPreloader = () => (
  <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
    <Spinner size="lg" color="default" />
  </div>
);