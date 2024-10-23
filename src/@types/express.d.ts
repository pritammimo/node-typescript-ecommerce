 // Adjust the path to your User model

import { User } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            user: User; // Optional user property
        }
    }
}
