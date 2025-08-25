"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  { id: 'student', label: 'Student', path: '/student' },
  { id: 'professional', label: 'Professional', path: '/professional' },
  { id: 'homemaker', label: 'Homemaker', path: '/homemaker' },
  { id: 'senior-citizen', label: 'Senior Citizen', path: '/senior-citizen' },
];

export default function UserInfoModal({ isOpen, onClose }: UserInfoModalProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    
    if (!selectedRole) {
      newErrors.role = 'Please select a role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      const selectedRoleData = roles.find(role => role.id === selectedRole);
      if (selectedRoleData) {
        const params = new URLSearchParams({
          name: name.trim(),
          age: age,
          role: selectedRole
        });
        router.push(`${selectedRoleData.path}?${params.toString()}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-in slide-in-from-bottom-4 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`mt-1 ${errors.age ? 'border-red-500' : ''}`}
              placeholder="Enter your age"
              min="1"
              max="120"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <Label>Role</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 text-sm font-medium rounded-md border-2 transition-colors ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}