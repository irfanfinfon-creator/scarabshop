import { useState } from 'react';
import { User } from 'lucide-react';
import { Profile } from '../../types';

interface ProfileSectionProps {
  profile: Profile | null;
  onUpdate: (formData: ProfileFormData) => Promise<any>;
}

export interface ProfileFormData {
  full_name: string;
  phone: string;
  email: string;
}

export function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    email: profile?.email || '',
  });

  const handleEdit = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      email: profile?.email || '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    await onUpdate(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Edit Profile
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </h3>
        <button
          onClick={handleEdit}
          className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <p className="text-lg font-medium">{profile?.email || 'Not set'}</p>
        </div>

        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <p className="text-lg font-medium">{profile?.full_name || 'Not set'}</p>
        </div>

        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <p className="text-lg font-medium">{profile?.phone || 'Not set'}</p>
        </div>
      </div>
    </div>
  );
}