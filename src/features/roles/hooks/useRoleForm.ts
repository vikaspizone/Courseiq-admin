/**
 * Role Form Hook.
 * Custom hook for handling role form state and submission.
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '../types';
import { createRole, updateRole } from '../api/roleApi';
import { createRolePermission, updateRolePermission, deleteRolePermission, getRolePermissions } from '@/features/role-permissions/api';
import { RolePermission } from '@/features/role-permissions/types';
import { ROUTES } from '@/features/common/constants/routes';

export function useRoleForm(
  initialData?: Role,
  activeModules: any[] = [],
  activePermissions: any[] = [],
  language: string = 'en'
) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>({});
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loadingRolePerms, setLoadingRolePerms] = useState(false);

  useEffect(() => {
    if (activeModules.length === 0 || activePermissions.length === 0) return;
    
    const fetchExistingPermissions = async () => {
      if (initialData?.id) {
        setLoadingRolePerms(true);
        try {
          const allRPs = await getRolePermissions();
          const roleRPs = allRPs.filter(rp => rp.role_id === initialData.id);
          setRolePermissions(roleRPs);

          const newMatrix: Record<string, Record<string, boolean>> = {};
          
          activeModules.forEach(mod => {
            newMatrix[mod.id] = {};
            activePermissions.forEach(perm => {
              newMatrix[mod.id][perm.id] = false;
            });
          });

          roleRPs.forEach(rp => {
            if (newMatrix[rp.module_id]) {
              rp.permission_ids?.forEach(pid => {
                newMatrix[rp.module_id][pid] = true;
              });
            }
          });

          setMatrix(newMatrix);
        } catch (err) {
          console.error("Failed to fetch role permissions", err);
        } finally {
          setLoadingRolePerms(false);
        }
      } else {
        const newMatrix: Record<string, Record<string, boolean>> = {};
        activeModules.forEach(mod => {
          newMatrix[mod.id] = {};
          activePermissions.forEach(perm => {
            newMatrix[mod.id][perm.id] = false;
          });
        });
        setMatrix(newMatrix);
      }
    };

    fetchExistingPermissions();
  }, [initialData?.id, activeModules.length, activePermissions.length]);

  const getPermissionName = (perm: any) => {
    if (perm.name) return perm.name;
    if (perm.translations && perm.translations.length > 0) {
      const translation = perm.translations.find((t: any) => t.languageCode === language) || perm.translations[0];
      return translation.name;
    }
    return 'Unknown';
  };

  const getViewPermissionId = () => {
    const viewPerm = activePermissions.find(p => getPermissionName(p).toLowerCase() === 'view');
    return viewPerm?.id;
  };

  const handleCheckboxChange = (moduleId: string, permissionId: string, checked: boolean) => {
    setMatrix(prev => {
      const next = { ...prev };
      next[moduleId] = { ...next[moduleId], [permissionId]: checked };

      const viewId = getViewPermissionId();
      if (viewId) {
        if (checked && permissionId !== viewId) {
          next[moduleId][viewId] = true;
        }
        if (!checked && permissionId === viewId) {
          Object.keys(next[moduleId]).forEach(pid => {
            next[moduleId][pid] = false;
          });
        }
      }

      return next;
    });
  };

  const handleSelectAllModule = (moduleId: string, checked: boolean) => {
    setMatrix(prev => {
      const next = { ...prev };
      next[moduleId] = { ...next[moduleId] };
      activePermissions.forEach(perm => {
        next[moduleId][perm.id] = checked;
      });
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setMatrix(prev => {
      const next = { ...prev };
      activeModules.forEach(mod => {
        next[mod.id] = { ...next[mod.id] };
        activePermissions.forEach(perm => {
          next[mod.id][perm.id] = checked;
        });
      });
      return next;
    });
  };

  const isModuleFullySelected = (moduleId: string) => {
    if (!matrix[moduleId]) return false;
    return activePermissions.every(perm => matrix[moduleId][perm.id]);
  };

  const isAllSelected = () => {
    if (activeModules.length === 0 || activePermissions.length === 0) return false;
    return activeModules.every(mod => isModuleFullySelected(mod.id));
  };

  const handleSubmit = async (
    values: { name: string; description?: string; is_active?: boolean },
    { setSubmitting }: any
  ) => {
    try {
      const payload = { 
        name: values.name, 
        is_active: values.is_active === true || String(values.is_active) === 'true'
      };
      
      let roleId = initialData?.id;
      
      if (isEditing && roleId) {
        await updateRole(roleId, payload);
      } else {
        const newRole = await createRole(payload);
        roleId = newRole.id;
      }

      if (roleId) {
        for (const mod of activeModules) {
          const modId = mod.id;
          const selectedPermIds = Object.keys(matrix[modId] || {}).filter(pid => matrix[modId][pid]);
          const existingRP = rolePermissions.find(rp => rp.module_id === modId);

          if (selectedPermIds.length === 0) {
            if (existingRP) {
              await deleteRolePermission(existingRP.id);
            }
          } else {
            if (existingRP) {
              const existingPermsStr = [...(existingRP.permission_ids || [])].sort().join(',');
              const newPermsStr = [...selectedPermIds].sort().join(',');
              if (existingPermsStr !== newPermsStr) {
                await updateRolePermission(existingRP.id, {
                  role_id: roleId,
                  module_id: modId,
                  permission_ids: selectedPermIds
                });
              }
            } else {
              await createRolePermission({
                role_id: roleId,
                module_id: modId,
                permission_ids: selectedPermIds
              });
            }
          }
        }
      }

      router.push(ROUTES.ROLE);
    } catch (error: any) {
      console.error('Failed to save role', error);
      alert(error.message || 'Failed to save role');
    } finally {
      setSubmitting(false);
    }
  };

  return { 
    isEditing, 
    handleSubmit,
    matrix,
    loadingRolePerms,
    handleCheckboxChange,
    handleSelectAllModule,
    handleSelectAll,
    isModuleFullySelected,
    isAllSelected
  };
}
