import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './useToast';
import { Profile, Address } from '../types';
import { ProfileFormData } from '../components/profile/ProfileSection';
import { AddressFormData } from '../components/profile/AddressSection';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast();

  // Fetch profile
  const fetchProfile = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      addToast({
        message: 'Failed to fetch profile',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [user, addToast]);

  // Fetch addresses
  const fetchAddresses = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setAddresses(data as Address[]);
    } catch (error) {
      addToast({
        message: 'Failed to fetch addresses',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [user, addToast]);

  // Update profile
  const updateProfile = useCallback(async (formData: ProfileFormData) => {
    if (!user) return;

    setLoading(true);
    try {
      // 1. Update Profile Logic
      const { error } = await supabase
        .from('profiles')
        .update({
          email: formData.email,
          full_name: formData.full_name,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      // 2. Update Auth Email if changed
      if (formData.email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: formData.email
        });

        if (authError) {
          // If auth update fails, warn user but don't rollback profile
          addToast({
            message: 'Profile updated, but email change requires verification. Please check your inbox.',
            type: 'warning',
          });
        }
      }

      addToast({
        message: 'Profile updated successfully',
        type: 'success',
      });

      await fetchProfile();
      return true;
    } catch (error) {
      addToast({
        message: 'Failed to update profile',
        type: 'error',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, addToast, fetchProfile]);

  // Create address
  const createAddress = useCallback(async (formData: AddressFormData) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('addresses')
        .insert({
          ...formData,
          user_id: user.id,
        });

      if (error) throw error;

      addToast({
        message: 'Address added successfully',
        type: 'success',
      });

      await fetchAddresses();
      return true;
    } catch (error) {
      addToast({
        message: 'Failed to add address',
        type: 'error',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, addToast, fetchAddresses]);

  // Update address
  const updateAddress = useCallback(async (addressId: string, formData: AddressFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('addresses')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', addressId);

      if (error) throw error;

      addToast({
        message: 'Address updated successfully',
        type: 'success',
      });

      await fetchAddresses();
      return true;
    } catch (error) {
      addToast({
        message: 'Failed to update address',
        type: 'error',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [addToast, fetchAddresses]);

  // Delete address
  const deleteAddress = useCallback(async (addressId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;

      addToast({
        message: 'Address deleted successfully',
        type: 'success',
      });

      await fetchAddresses();
      return true;
    } catch (error) {
      addToast({
        message: 'Failed to delete address',
        type: 'error',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [addToast, fetchAddresses]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAddresses();
    }
  }, [user, fetchProfile, fetchAddresses]);

  return {
    profile,
    addresses,
    loading,
    fetchProfile,
    fetchAddresses,
    updateProfile,
    createAddress,
    updateAddress,
    deleteAddress,
  };
}