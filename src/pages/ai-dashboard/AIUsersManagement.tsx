import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter,
  MoreVertical,
  Mail, 
  Shield, 
  Crown,
  Settings,
  Trash2,
  Edit,
  Eye,
  Plus,
  X,
  Check,
  AlertCircle,
  Star,
  MapPin,
  Clock,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'staff' | 'security';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  avatar?: string;
  lastLogin: string;
  joinDate: string;
  permissions: string[];
  location?: string;
  department?: string;
  phone?: string;
  notes?: string;
  performanceScore?: number;
  tasksCompleted?: number;
  hoursThisWeek?: number;
}

const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'Ahmed Al-Mansouri',
    email: 'ahmed.mansouri@tunipark.com',
    role: 'owner',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    joinDate: '2024-01-01',
    permissions: ['full_access', 'billing', 'user_management', 'system_config'],
    location: 'Tunis, Tunisia',
    department: 'Executive',
    phone: '+216 20 123 456',
    performanceScore: 98,
    tasksCompleted: 156,
    hoursThisWeek: 45
  },
  {
    id: 'U002',
    name: 'Sarah Ben Ahmed',
    email: 'sarah.benahmed@tunipark.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-15 12:15',
    joinDate: '2024-01-03',
    permissions: ['manage_spaces', 'view_reports', 'manage_staff'],
    location: 'Sfax, Tunisia',
    department: 'Operations',
    phone: '+216 25 789 012',
    performanceScore: 94,
    tasksCompleted: 89,
    hoursThisWeek: 40
  },
  {
    id: 'U003',
    name: 'Mohamed Trabelsi',
    email: 'mohamed.trabelsi@security.tn',
    role: 'security',
    status: 'active',
    lastLogin: '2024-01-15 09:45',
    joinDate: '2024-01-05',
    permissions: ['monitor_spaces', 'emergency_response'],
    location: 'Sousse, Tunisia',
    department: 'Security',
    phone: '+216 23 456 789',
    performanceScore: 91,
    tasksCompleted: 67,
    hoursThisWeek: 38
  },
  {
    id: 'U004',
    name: 'Fatima Khelifi',
    email: 'fatima.khelifi@tunipark.com',
    role: 'staff',
    status: 'active',
    lastLogin: '2024-01-15 08:20',
    joinDate: '2024-01-10',
    permissions: ['view_spaces', 'customer_support'],
    location: 'Bizerte, Tunisia',
    department: 'Customer Service',
    phone: '+216 27 345 678',
    performanceScore: 88,
    tasksCompleted: 45,
    hoursThisWeek: 35
  },
  {
    id: 'U005',
    name: 'Karim Oueslati',
    email: 'karim.oueslati@tunipark.com',
    role: 'manager',
    status: 'inactive',
    lastLogin: '2024-01-12 16:20',
    joinDate: '2024-01-02',
    permissions: ['manage_spaces', 'view_reports'],
    location: 'Nabeul, Tunisia',
    department: 'Operations',
    phone: '+216 24 567 890',
    performanceScore: 85,
    tasksCompleted: 23,
    hoursThisWeek: 0
  }
];

export const AIUsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | 'fr' || 'en';
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setLanguage(savedLanguage);
    setTheme(savedTheme);
  }, []);

  const translations = {
    en: {
      title: 'Users & Staff Management',
      subtitle: 'Manage your team, roles, and permissions',
      addUser: 'Add User',
      inviteUsers: 'Invite Users',
      searchPlaceholder: 'Search users...',
      allRoles: 'All Roles',
      allStatuses: 'All Statuses',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      managers: 'Managers',
      staff: 'Staff',
      avgPerformance: 'Avg Performance',
      lastLogin: 'Last Login',
      joinDate: 'Join Date',
      performance: 'Performance',
      tasksCompleted: 'Tasks Completed',
      hoursThisWeek: 'Hours This Week',
      permissions: 'Permissions',
      location: 'Location',
      department: 'Department',
      phone: 'Phone',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View Details',
      owner: 'Owner',
      manager: 'Manager',
      security: 'Security',
      staff: 'Staff',
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      pending: 'Pending'
    },
    ar: {
      title: 'إدارة المستخدمين والموظفين',
      subtitle: 'إدارة فريقك والأدوار والصلاحيات',
      addUser: 'إضافة مستخدم',
      inviteUsers: 'دعوة مستخدمين',
      searchPlaceholder: 'البحث عن المستخدمين...',
      allRoles: 'جميع الأدوار',
      allStatuses: 'جميع الحالات',
      totalUsers: 'إجمالي المستخدمين',
      activeUsers: 'المستخدمون النشطون',
      managers: 'المدراء',
      staff: 'الموظفون',
      avgPerformance: 'متوسط الأداء',
      lastLogin: 'آخر تسجيل دخول',
      joinDate: 'تاريخ الانضمام',
      performance: 'الأداء',
      tasksCompleted: 'المهام المكتملة',
      hoursThisWeek: 'ساعات هذا الأسبوع',
      permissions: 'الصلاحيات',
      location: 'الموقع',
      department: 'القسم',
      phone: 'الهاتف',
      edit: 'تعديل',
      delete: 'حذف',
      view: 'عرض التفاصيل',
      owner: 'مالك',
      manager: 'مدير',
      security: 'أمن',
      staff: 'موظف',
      active: 'نشط',
      inactive: 'غير نشط',
      suspended: 'معلق',
      pending: 'في الانتظار'
    },
    fr: {
      title: 'Gestion des Utilisateurs et du Personnel',
      subtitle: 'Gérez votre équipe, les rôles et les permissions',
      addUser: 'Ajouter un Utilisateur',
      inviteUsers: 'Inviter des Utilisateurs',
      searchPlaceholder: 'Rechercher des utilisateurs...',
      allRoles: 'Tous les Rôles',
      allStatuses: 'Tous les Statuts',
      totalUsers: 'Total Utilisateurs',
      activeUsers: 'Utilisateurs Actifs',
      managers: 'Managers',
      staff: 'Personnel',
      avgPerformance: 'Performance Moy.',
      lastLogin: 'Dernière Connexion',
      joinDate: 'Date d\'Adhésion',
      performance: 'Performance',
      tasksCompleted: 'Tâches Terminées',
      hoursThisWeek: 'Heures Cette Semaine',
      permissions: 'Permissions',
      location: 'Emplacement',
      department: 'Département',
      phone: 'Téléphone',
      edit: 'Modifier',
      delete: 'Supprimer',
      view: 'Voir les Détails',
      owner: 'Propriétaire',
      manager: 'Manager',
      security: 'Sécurité',
      staff: 'Personnel',
      active: 'Actif',
      inactive: 'Inactif',
      suspended: 'Suspendu',
      pending: 'En Attente'
    }
  };

  const t = translations[language];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'from-purple-500 to-pink-500';
      case 'manager': return 'from-blue-500 to-cyan-500';
      case 'security': return 'from-orange-500 to-red-500';
      case 'staff': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return Crown;
      case 'manager': return Shield;
      case 'security': return Shield;
      case 'staff': return UsersIcon;
      default: return UsersIcon;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    managers: users.filter(u => u.role === 'manager').length,
    staff: users.filter(u => u.role === 'staff').length,
    avgPerformance: Math.round(users.reduce((acc, u) => acc + (u.performanceScore || 0), 0) / users.length)
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="h-full space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t.subtitle}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t.inviteUsers}
            </Button>
            <Button 
              onClick={() => setIsAddUserOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {t.addUser}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {[
          { 
            title: t.totalUsers, 
            value: stats.total, 
            icon: UsersIcon, 
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-500/10 to-cyan-500/10'
          },
          { 
            title: t.activeUsers, 
            value: stats.active, 
            icon: Activity, 
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-500/10 to-emerald-500/10'
          },
          { 
            title: t.managers, 
            value: stats.managers, 
            icon: Shield, 
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-500/10 to-pink-500/10'
          },
          { 
            title: t.staff, 
            value: stats.staff, 
            icon: Star, 
            color: 'from-orange-500 to-amber-500',
            bgColor: 'from-orange-500/10 to-amber-500/10'
          },
          { 
            title: t.avgPerformance, 
            value: `${stats.avgPerformance}%`, 
            icon: Star, 
            color: 'from-indigo-500 to-purple-500',
            bgColor: 'from-indigo-500/10 to-purple-500/10'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/30">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/30 focus:bg-white dark:focus:bg-gray-900"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40 bg-white/50 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/30">
                    <SelectValue placeholder={t.allRoles} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 dark:border-gray-700/30">
                    <SelectItem value="all">{t.allRoles}</SelectItem>
                    <SelectItem value="owner">{t.owner}</SelectItem>
                    <SelectItem value="manager">{t.manager}</SelectItem>
                    <SelectItem value="security">{t.security}</SelectItem>
                    <SelectItem value="staff">{t.staff}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-white/50 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/30">
                    <SelectValue placeholder={t.allStatuses} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 dark:border-gray-700/30">
                    <SelectItem value="all">{t.allStatuses}</SelectItem>
                    <SelectItem value="active">{t.active}</SelectItem>
                    <SelectItem value="inactive">{t.inactive}</SelectItem>
                    <SelectItem value="suspended">{t.suspended}</SelectItem>
                    <SelectItem value="pending">{t.pending}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredUsers.map((user, index) => {
            const RoleIcon = getRoleIcon(user.role);
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 overflow-hidden h-full">
                  {/* Card Header */}
                  <div className="relative p-6 pb-4">
                    <div className={`absolute inset-0 bg-gradient-to-r ${getRoleColor(user.role)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="flex items-start justify-between relative">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-14 h-14 border-2 border-white/20 dark:border-gray-700/30 shadow-lg">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className={`bg-gradient-to-r ${getRoleColor(user.role)} text-white font-semibold`}>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
                            user.status === 'active' ? 'bg-green-500' : 
                            user.status === 'inactive' ? 'bg-gray-400' :
                            user.status === 'suspended' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`bg-gradient-to-r ${getRoleColor(user.role)} text-white border-0 text-xs`}>
                              <RoleIcon className="w-3 h-3 mr-1" />
                              {t[user.role as keyof typeof t] || user.role}
                            </Badge>
                            <Badge className={`${getStatusColor(user.status)} text-xs`}>
                              {t[user.status as keyof typeof t] || user.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="p-2 hover:bg-white/20 dark:hover:bg-gray-700/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end"
                          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 dark:border-gray-700/30"
                        >
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedUser(user);
                              setIsUserModalOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {t.view}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="w-4 h-4 mr-2" />
                            {t.edit}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user)}
                            className="cursor-pointer text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="pt-0 pb-6 relative">
                    <div className="space-y-3">
                      {/* Performance Score */}
                      {user.performanceScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{t.performance}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${
                                  user.performanceScore >= 90 ? 'from-green-500 to-emerald-500' :
                                  user.performanceScore >= 75 ? 'from-yellow-500 to-orange-500' :
                                  'from-red-500 to-pink-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${user.performanceScore}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.performanceScore}%
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {user.tasksCompleted || 0}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {t.tasksCompleted}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {user.hoursThisWeek || 0}h
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {t.hoursThisWeek}
                          </p>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="space-y-2 pt-2 border-t border-white/20 dark:border-gray-700/30">
                        {user.department && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Settings className="w-4 h-4 mr-2" />
                            {user.department}
                          </div>
                        )}
                        {user.location && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            {user.location}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          {t.lastLogin}: {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* User Details Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 dark:border-gray-700/30">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className={`bg-gradient-to-r ${getRoleColor(selectedUser.role)} text-white`}>
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</Label>
                    <Badge className={`bg-gradient-to-r ${getRoleColor(selectedUser.role)} text-white border-0 mt-1`}>
                      {t[selectedUser.role as keyof typeof t] || selectedUser.role}
                    </Badge>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</Label>
                    <Badge className={`${getStatusColor(selectedUser.status)} mt-1`}>
                      {t[selectedUser.status as keyof typeof t] || selectedUser.status}
                    </Badge>
                  </div>
                  
                  {selectedUser.department && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.department}</Label>
                      <p className="text-gray-900 dark:text-white mt-1">{selectedUser.department}</p>
                    </div>
                  )}
                  
                  {selectedUser.location && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.location}</Label>
                      <p className="text-gray-900 dark:text-white mt-1">{selectedUser.location}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {selectedUser.phone && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.phone}</Label>
                      <p className="text-gray-900 dark:text-white mt-1">{selectedUser.phone}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.joinDate}</Label>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {new Date(selectedUser.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.lastLogin}</Label>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {new Date(selectedUser.lastLogin).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/20 dark:border-gray-700/30">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.permissions}</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUser.permissions.map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 dark:border-gray-700/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-white/50 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/30"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
