import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
    const { action, entityTitle, entityType } = log;

    switch (action) {
        case ACTION.CREATE:
            return `Created a ${entityType.toLowerCase()} "${entityTitle}"`

        case ACTION.UPDATE:
            return `Updated ${entityType.toLowerCase()} "${entityTitle}"`

        case ACTION.DELETE:
            return `Deleted a ${entityType.toLowerCase()} "${entityTitle}"`

        case ACTION.COPY:
            return `Copied a ${entityType.toLowerCase()} "${entityTitle}"`
        default:
            return `Unknown ${entityType.toLowerCase()} "${entityTitle}"`
    }
}