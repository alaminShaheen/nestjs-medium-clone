import { SetMetadata } from "@nestjs/common";

// Custom decorator for routes not needing authentication
export const PublicRoute = () => SetMetadata<string, boolean>("public", true);
