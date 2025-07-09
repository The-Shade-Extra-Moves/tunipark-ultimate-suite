import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  Shield,
  Crown,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'manager' | 'attendant' | 'support';
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  joinDate: string;
  lastActive: string;
  permissions: string[];
  notes?: string;
}

interface UsersStaffManagementProps {
  isDarkMode: boolean;
  currentLang: string;
  isRTL: boolean;
}

const UsersStaffManagement: React.FC<UsersStaffManagementProps> = ({
  isDarkMode,
  currentLang,
  isRTL
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Translation objects
  const translations = {
    en: {
      title: "Users & Staff Management",
      addUser: "Add User",
      search: "Search users...",
      filterByRole: "Filter by Role",
      filterByStatus: "Filter by Status",
      allRoles: "All Roles",
      allStatuses: "All Statuses",
      owner: "Owner",
      manager: "Manager", 
      attendant: "Attendant",
      support: "Support",
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      save: "Save",
      confirm: "Confirm",
      name: "Name",
      email: "Email",
      phone: "Phone",
      role: "Role",
      status: "Status",
      joinDate: "Join Date",
      lastActive: "Last Active",
      permissions: "Permissions",
      notes: "Notes",
      addNewUser: "Add New User",
      editUser: "Edit User",
      deleteUser: "Delete User",
      deleteConfirmation: "Are you sure you want to delete this user?",
      viewReservations: "View Reservations",
      manageParkingSpaces: "Manage Parking Spaces",
      handlePayments: "Handle Payments",
      viewReports: "View Reports",
      manageUsers: "Manage Users",
      systemSettings: "System Settings"
    },
    ar: {
      title: "إدارة المستخدمين والموظفين",
      addUser: "إضافة مستخدم",
      search: "البحث عن المستخدمين...",
      filterByRole: "تصفية حسب الدور",
      filterByStatus: "تصفية حسب الحالة",
      allRoles: "جميع الأدوار",
      allStatuses: "جميع الحالات",
      owner: "مالك",
      manager: "مدير",
      attendant: "موظف",
      support: "دعم فني",
      active: "نشط",
      inactive: "غير نشط",
      pending: "في الانتظار",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      save: "حفظ",
      confirm: "تأكيد",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      role: "الدور",
      status: "الحالة",
      joinDate: "تاريخ الانضمام",
      lastActive: "آخر نشاط",
      permissions: "الصلاحيات",
      notes: "ملاحظات",
      addNewUser: "إضافة مستخدم جديد",
      editUser: "تعديل المستخدم",
      deleteUser: "حذف المستخدم",
      deleteConfirmation: "هل أنت متأكد من حذف هذا المستخدم؟",
      viewReservations: "عرض الحجوزات",
      manageParkingSpaces: "إدارة أماكن الوقوف",
      handlePayments: "معالجة المدفوعات",
      viewReports: "عرض التقارير",
      manageUsers: "إدارة المستخدمين",
      systemSettings: "إعدادات النظام"
    },
    fr: {
      title: "Gestion des Utilisateurs et du Personnel",
      addUser: "Ajouter un Utilisateur",
      search: "Rechercher des utilisateurs...",
      filterByRole: "Filtrer par Rôle",
      filterByStatus: "Filtrer par Statut",
      allRoles: "Tous les Rôles",
      allStatuses: "Tous les Statuts",
      owner: "Propriétaire",
      manager: "Gestionnaire",
      attendant: "Préposé",
      support: "Support",
      active: "Actif",
      inactive: "Inactif",
      pending: "En Attente",
      edit: "Modifier",
      delete: "Supprimer",
      cancel: "Annuler",
      save: "Enregistrer",
      confirm: "Confirmer",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      role: "Rôle",
      status: "Statut",
      joinDate: "Date d'Inscription",
      lastActive: "Dernière Activité",
      permissions: "Permissions",
      notes: "Notes",
      addNewUser: "Ajouter un Nouvel Utilisateur",
      editUser: "Modifier l'Utilisateur",
      deleteUser: "Supprimer l'Utilisateur",
      deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cet utilisateur?",
      viewReservations: "Voir les Réservations",
      manageParkingSpaces: "Gérer les Places de Parking",
      handlePayments: "Gérer les Paiements",
      viewReports: "Voir les Rapports",
      manageUsers: "Gérer les Utilisateurs",
      systemSettings: "Paramètres Système"
    },
    de: {
      title: "Benutzer- und Personalverwaltung",
      addUser: "Benutzer Hinzufügen",
      search: "Benutzer suchen...",
      filterByRole: "Nach Rolle Filtern",
      filterByStatus: "Nach Status Filtern",
      allRoles: "Alle Rollen",
      allStatuses: "Alle Status",
      owner: "Eigentümer",
      manager: "Manager",
      attendant: "Betreuer",
      support: "Support",
      active: "Aktiv",
      inactive: "Inaktiv",
      pending: "Ausstehend",
      edit: "Bearbeiten",
      delete: "Löschen",
      cancel: "Abbrechen",
      save: "Speichern",
      confirm: "Bestätigen",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      role: "Rolle",
      status: "Status",
      joinDate: "Beitrittsdatum",
      lastActive: "Zuletzt Aktiv",
      permissions: "Berechtigungen",
      notes: "Notizen",
      addNewUser: "Neuen Benutzer Hinzufügen",
      editUser: "Benutzer Bearbeiten",
      deleteUser: "Benutzer Löschen",
      deleteConfirmation: "Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?",
      viewReservations: "Reservierungen Anzeigen",
      manageParkingSpaces: "Parkplätze Verwalten",
      handlePayments: "Zahlungen Verwalten",
      viewReports: "Berichte Anzeigen",
      manageUsers: "Benutzer Verwalten",
      systemSettings: "Systemeinstellungen"
    }
  };

  const t = translations[currentLang as keyof typeof translations];

  // Sample data
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'Ahmed Ben Ali',
        email: 'ahmed@tunipark.com',
        phone: '+216 98 123 456',
        role: 'owner',
        status: 'active',
        avatar: '/avatars/ahmed.jpg',
        joinDate: '2024-01-15',
        lastActive: '2024-12-15 09:30',
        permissions: ['viewReservations', 'manageParkingSpaces', 'handlePayments', 'viewReports', 'manageUsers', 'systemSettings'],
        notes: 'Founder and CEO'
      },
      {
        id: '2', 
        name: 'Sarah Dubois',
        email: 'sarah@tunipark.com',
        phone: '+33 1 45 67 89',
        role: 'manager',
        status: 'active',
        avatar: '/avatars/sarah.jpg',
        joinDate: '2024-02-20',
        lastActive: '2024-12-15 08:45',
        permissions: ['viewReservations', 'manageParkingSpaces', 'handlePayments', 'viewReports'],
        notes: 'Operations Manager - Paris Location'
      },
      {
        id: '3',
        name: 'Max Mueller',
        email: 'max@tunipark.com', 
        phone: '+49 30 123 456',
        role: 'attendant',
        status: 'active',
        joinDate: '2024-03-10',
        lastActive: '2024-12-14 18:20',
        permissions: ['viewReservations', 'manageParkingSpaces'],
        notes: 'Night shift attendant'
      },
      {
        id: '4',
        name: 'Fatima Al-Zahra',
        email: 'fatima@tunipark.com',
        phone: '+216 71 987 654',
        role: 'support',
        status: 'pending',
        joinDate: '2024-12-10',
        lastActive: '2024-12-13 16:15',
        permissions: ['viewReservations'],
        notes: 'New customer support representative'
      }
    ];
    setUsers(sampleUsers);
  }, []);

  // Filtered users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4" />;
      case 'manager': return <Shield className="w-4 h-4" />;
      case 'attendant': return <User className="w-4 h-4" />;
      case 'support': return <AlertCircle className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'manager': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      case 'attendant': return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
      case 'support': return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const UserCard = ({ user }: { user: User }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className={`
        backdrop-blur-xl border-0 transition-all duration-300
        ${isDarkMode 
          ? 'bg-white/5 hover:bg-white/10 shadow-lg shadow-black/20' 
          : 'bg-white/80 hover:bg-white/90 shadow-lg shadow-gray-200/50'
        }
        hover:shadow-2xl hover:scale-[1.02]
      `}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 ring-2 ring-purple-500/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-1`}>
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`opacity-0 group-hover:opacity-100 transition-opacity
                    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}
                  `}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`
                backdrop-blur-xl border-0
                ${isDarkMode 
                  ? 'bg-gray-900/90 text-white' 
                  : 'bg-white/90 text-gray-900'
                }
              `}>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedUser(user);
                    setIsEditDialogOpen(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  {t.edit}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDeleteDialogOpen(true);
                  }}
                  className="flex items-center gap-2 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  {t.delete}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {user.phone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {user.joinDate}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={`${getRoleBadgeColor(user.role)} flex items-center gap-1`}>
              {getRoleIcon(user.role)}
              {t[user.role as keyof typeof t]}
            </Badge>
            <div className="flex items-center gap-1">
              {getStatusIcon(user.status)}
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t[user.status as keyof typeof t]}
              </span>
            </div>
          </div>

          {user.notes && (
            <p className={`text-sm italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              "{user.notes}"
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const UserDialog = ({ 
    isOpen, 
    onClose, 
    user, 
    isEdit = false 
  }: { 
    isOpen: boolean; 
    onClose: () => void; 
    user?: User | null; 
    isEdit?: boolean 
  }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'attendant',
      status: user?.status || 'pending',
      notes: user?.notes || '',
      permissions: user?.permissions || []
    });

    const allPermissions = [
      'viewReservations',
      'manageParkingSpaces', 
      'handlePayments',
      'viewReports',
      'manageUsers',
      'systemSettings'
    ];

    const handleSave = () => {
      if (isEdit && user) {
        setUsers(prev => prev.map(u => 
          u.id === user.id 
            ? { ...u, ...formData }
            : u
        ));
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          ...formData,
          joinDate: new Date().toISOString().split('T')[0],
          lastActive: new Date().toISOString()
        };
        setUsers(prev => [...prev, newUser]);
      }
      onClose();
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`
          backdrop-blur-xl border-0 max-w-2xl
          ${isDarkMode 
            ? 'bg-gray-900/90 text-white' 
            : 'bg-white/90 text-gray-900'
          }
        `}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? t.editUser : t.addNewUser}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`
                  backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-white/10 text-white placeholder-gray-400' 
                    : 'bg-gray-100/80 text-gray-900'
                  }
                `}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`
                  backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-white/10 text-white placeholder-gray-400' 
                    : 'bg-gray-100/80 text-gray-900'
                  }
                `}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`
                  backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-white/10 text-white placeholder-gray-400' 
                    : 'bg-gray-100/80 text-gray-900'
                  }
                `}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{t.role}</Label>
              <Select value={formData.role} onValueChange={(value: 'owner' | 'manager' | 'attendant' | 'support') => setFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger className={`
                  backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-white/10 text-white' 
                    : 'bg-gray-100/80 text-gray-900'
                  }
                `}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={`
                  backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-gray-900/90 text-white' 
                    : 'bg-white/90 text-gray-900'
                  }
                `}>
                  <SelectItem value="owner">{t.owner}</SelectItem>
                  <SelectItem value="manager">{t.manager}</SelectItem>
                  <SelectItem value="attendant">{t.attendant}</SelectItem>
                  <SelectItem value="support">{t.support}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">{t.status}</Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive' | 'pending') => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className={`
                  backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-white/10 text-white' 
                    : 'bg-gray-100/80 text-gray-900'
                  }
                `}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={`
                  backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-gray-900/90 text-white' 
                    : 'bg-white/90 text-gray-900'
                  }
                `}>
                  <SelectItem value="active">{t.active}</SelectItem>
                  <SelectItem value="inactive">{t.inactive}</SelectItem>
                  <SelectItem value="pending">{t.pending}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2 space-y-2">
              <Label>{t.permissions}</Label>
              <div className="grid grid-cols-2 gap-2">
                {allPermissions.map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={formData.permissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            permissions: [...prev.permissions, permission]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            permissions: prev.permissions.filter(p => p !== permission)
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={permission} className="text-sm">
                      {t[permission as keyof typeof t]}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes">{t.notes}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className={`
                  backdrop-blur-xl border-0 min-h-[80px]
                  ${isDarkMode 
                    ? 'bg-white/10 text-white placeholder-gray-400' 
                    : 'bg-gray-100/80 text-gray-900'
                  }
                `}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onClose}
              className={`
                backdrop-blur-xl border-0
                ${isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-gray-100/80 text-gray-900 hover:bg-gray-200/80'
                }
              `}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
            {t.title}
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your team members and their permissions
          </p>
        </div>
        
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t.addUser}
        </Button>
      </div>

      {/* Filters */}
      <Card className={`
        backdrop-blur-xl border-0
        ${isDarkMode 
          ? 'bg-white/5 shadow-lg shadow-black/20' 
          : 'bg-white/80 shadow-lg shadow-gray-200/50'
        }
      `}>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  pl-10 backdrop-blur-xl border-0
                  ${isDarkMode 
                    ? 'bg-white/10 text-white placeholder-gray-400' 
                    : 'bg-gray-100/80 text-gray-900'
                  }
                `}
              />
            </div>
            
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className={`
                backdrop-blur-xl border-0
                ${isDarkMode 
                  ? 'bg-white/10 text-white' 
                  : 'bg-gray-100/80 text-gray-900'
                }
              `}>
                <SelectValue placeholder={t.filterByRole} />
              </SelectTrigger>
              <SelectContent className={`
                backdrop-blur-xl border-0
                ${isDarkMode 
                  ? 'bg-gray-900/90 text-white' 
                  : 'bg-white/90 text-gray-900'
                }
              `}>
                <SelectItem value="all">{t.allRoles}</SelectItem>
                <SelectItem value="owner">{t.owner}</SelectItem>
                <SelectItem value="manager">{t.manager}</SelectItem>
                <SelectItem value="attendant">{t.attendant}</SelectItem>
                <SelectItem value="support">{t.support}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className={`
                backdrop-blur-xl border-0
                ${isDarkMode 
                  ? 'bg-white/10 text-white' 
                  : 'bg-gray-100/80 text-gray-900'
                }
              `}>
                <SelectValue placeholder={t.filterByStatus} />
              </SelectTrigger>
              <SelectContent className={`
                backdrop-blur-xl border-0
                ${isDarkMode 
                  ? 'bg-gray-900/90 text-white' 
                  : 'bg-white/90 text-gray-900'
                }
              `}>
                <SelectItem value="all">{t.allStatuses}</SelectItem>
                <SelectItem value="active">{t.active}</SelectItem>
                <SelectItem value="inactive">{t.inactive}</SelectItem>
                <SelectItem value="pending">{t.pending}</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {filteredUsers.length} results
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No users found matching your criteria
          </p>
        </motion.div>
      )}

      {/* Dialogs */}
      <UserDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
      
      <UserDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        isEdit={true}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className={`
          backdrop-blur-xl border-0
          ${isDarkMode 
            ? 'bg-gray-900/90 text-white' 
            : 'bg-white/90 text-gray-900'
          }
        `}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-500">
              {t.deleteUser}
            </DialogTitle>
          </DialogHeader>
          
          <p className={`py-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.deleteConfirmation}
          </p>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedUser(null);
              }}
              className={`
                backdrop-blur-xl border-0
                ${isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-gray-100/80 text-gray-900 hover:bg-gray-200/80'
                }
              `}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={() => {
                if (selectedUser) {
                  setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
                }
                setIsDeleteDialogOpen(false);
                setSelectedUser(null);
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
            >
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { UsersStaffManagement };
