export const rolePermissions: Record<'vice_president' | 'division_head', string[]> = {
  vice_president: [
    'add members',
    'manage members',
    'schedule sessions',
    'create divisions',
  ],
  division_head: [
    'upload resources',
    'manage members',
    'schedule sessions',
    'mark attendance',
  ],
};