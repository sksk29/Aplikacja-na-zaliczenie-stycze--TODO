import { LoadingOverlay } from '@mantine/core';

export default function PageLoader() {
  return (
    <LoadingOverlay
      visible
      title="Loading..."
      overlayBlur={2}
      transitionDuration={300}
      overlayColor="#c5c5c5"
      loaderProps={{
        size: 100,
        variant: 'bars'
      }}
    />
  );
}
