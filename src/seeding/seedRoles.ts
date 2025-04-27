import Role from '../models/role.model';

export const seedRoles = async () => {
  const roles = [
    { name: 'super_admin', permissions: ['*'], is_active: true },
    { name: 'president', permissions: ['manage_divisions', 'manage_users'], is_active: true },
    { name: 'division_head', permissions: ['manage_groups', 'view_reports'], is_active: true },
    { name: 'member', permissions: ['view_content'], is_active: true },
  ];

  for (const role of roles) {
    const existingRole = await Role.findOne({ name: role.name });
    if (!existingRole) {
      await Role.create(role);
      console.log(`Role ${role.name} created.`);
    } else {
      console.log(`Role ${role.name} already exists.`);
    }
  }
};