/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  ShieldCheck, 
  Recycle, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  Plus,
  BarChart3,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  User,
  ArrowRight,
  Globe,
  Leaf,
  Database,
  Building2,
  MessageSquare,
  ChevronRight,
  Monitor,
  ClipboardList,
  PlusCircle,
  Camera,
  ExternalLink,
  HelpCircle,
  Clock,
  Lock,
  Zap,
  AlertTriangle,
  ShieldAlert,
  Navigation,
  Filter,
  MousePointer2,
  Play,
  Check,
  Minus,
  QrCode,
  RefreshCw,
  PenTool,
  ChevronDown,
  Scan,
  Upload,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Hash,
  Eye,
  Route,
  Shield,
  Timer,
  ChevronLeft,
  Radio,
  Package,
  ArrowLeft,
  HardDrive,
  FileCheck,
  Download,
  Image,
  Video,
  FileBadge,
  Clipboard,
  TrendingUp,
  TrendingDown,
  Link2,
  Send,
  FileSearch,
  BadgeCheck,
  CircleAlert,
  History,
  CircleDot,
  Building,
  FileWarning,
  Cog,
  Layers,
  GitBranch,
  Cpu,
  MemoryStick,
  HardDrive as HardDriveIcon,
  Box,
  Gem,
  Wrench,
  Gift,
  Trash2,
  Factory,
  CircleDollarSign,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const statsData = [
  { name: 'Jan', recycled: 400, carbon: 240 },
  { name: 'Feb', recycled: 300, carbon: 139 },
  { name: 'Mar', recycled: 200, carbon: 980 },
  { name: 'Apr', recycled: 278, carbon: 390 },
  { name: 'May', recycled: 189, carbon: 480 },
  { name: 'Jun', recycled: 239, carbon: 380 },
  { name: 'Jul', recycled: 349, carbon: 430 },
];

const recentAssets = [
  { id: 'ASSET-001', sn: 'SN982341', type: 'Server', status: 'In Transit', location: 'Seoul -> Incheon', time: '10 mins ago' },
  { id: 'ASSET-002', sn: 'SN123456', type: 'PC', status: 'Processing', location: 'ITAD Center A', time: '1 hour ago' },
  { id: 'ASSET-003', sn: 'SN778899', type: 'Network', status: 'Disposed', location: 'ITAD Center B', time: '3 hours ago' },
  { id: 'ASSET-004', sn: 'SN554433', type: 'Server', status: 'Registered', location: 'Emitter Site X', time: '5 hours ago' },
];

const carbonData = [
  { month: '9월', value: 120 },
  { month: '10월', value: 150 },
  { month: '11월', value: 180 },
  { month: '12월', value: 210 },
  { month: '1월', value: 250 },
  { month: '2월', value: 280 },
];

const inquiryBoard = [
  { id: 1, title: 'ITAD 서비스 견적 문의드립니다.', author: 'SKT 자산관리팀', date: '2024-03-22', status: '답변완료' },
  { id: 2, title: '데이터 완전 파기 인증서 발급 절차 문의', author: '네이버 클라우드', date: '2024-03-21', status: '검토중' },
  { id: 3, title: '지방 사업장 자산 일괄 수거 가능 여부', author: '삼성전자 인사팀', date: '2024-03-21', status: '답변완료' },
  { id: 4, title: 'ESG 리포트 데이터 연동 API 제공 문의', author: 'LG CNS', date: '2024-03-20', status: '답변완료' },
  { id: 5, title: '서버 랙 단위 일괄 폐기 프로세스 안내 요청', author: '카카오 데이터센터', date: '2024-03-19', status: '검토중' },
];

const faqData = [
  { id: 1, question: 'ITAD 서비스 신청은 어떻게 하나요?', answer: '플랫폼 로그인 후 [신규 배출 신청] 메뉴를 통해 간편하게 신청하실 수 있습니다.' },
  { id: 2, question: '데이터 파기 인증서는 언제 발급되나요?', answer: '데이터 파기 작업 완료 후 24시간 이내에 플랫폼에서 자동으로 발급되며 다운로드 가능합니다.' },
  { id: 3, question: '수거 비용은 어떻게 산정되나요?', answer: '자산의 종류, 수량, 수거 지역에 따라 차등 적용되며 견적 단계에서 상세히 안내해 드립니다.' },
  { id: 4, question: '소량의 장비도 수거가 가능한가요?', answer: '네, 수량에 관계없이 서비스 이용이 가능합니다. 단, 소량의 경우 별도의 운송비가 발생할 수 있습니다.' },
];

// Dashboard Mock Data
const operationalData = [
  { month: '10월', count: 420, cumulative: 2100 },
  { month: '11월', count: 380, cumulative: 2480 },
  { month: '12월', count: 510, cumulative: 2990 },
  { month: '1월', count: 450, cumulative: 3440 },
  { month: '2월', count: 480, cumulative: 3920 },
  { month: '3월', count: 540, cumulative: 4460 },
];

const processingMethodData = [
  { name: '재사용', value: 45, color: '#10b981' },
  { name: '부품회수', value: 25, color: '#3b82f6' },
  { name: '소재재활용', value: 20, color: '#f59e0b' },
  { name: '폐기', value: 10, color: '#ef4444' },
];

const equipmentTypeData = [
  { type: 'PC', count: 120, server: 40, mobile: 80, network: 30 },
  { type: 'Server', count: 80, server: 120, mobile: 40, network: 60 },
  { type: 'Mobile', count: 200, server: 30, mobile: 150, network: 20 },
  { type: 'Network', count: 50, server: 60, mobile: 20, network: 100 },
];

const collectionTrendData = [
  { month: '10월', count: 24, weight: 1200 },
  { month: '11월', count: 28, weight: 1450 },
  { month: '12월', count: 35, weight: 1800 },
  { month: '1월', count: 30, weight: 1600 },
  { month: '2월', count: 32, weight: 1750 },
  { month: '3월', count: 40, weight: 2100 },
];

const esgCarbonData = [
  { month: '10월', reduction: 1200 },
  { month: '11월', reduction: 2500 },
  { month: '12월', reduction: 4100 },
  { month: '1월', reduction: 5800 },
  { month: '2월', reduction: 7600 },
  { month: '3월', reduction: 9800 },
];

const landfillAvoidanceData = [
  { month: '10월', weight: 850 },
  { month: '11월', weight: 920 },
  { month: '12월', weight: 1100 },
  { month: '1월', weight: 1050 },
  { month: '2월', weight: 1200 },
  { month: '3월', weight: 1400 },
];

const lifeExtensionData = [
  { month: '10월', years: 2.1 },
  { month: '11월', years: 2.3 },
  { month: '12월', years: 2.2 },
  { month: '1월', years: 2.5 },
  { month: '2월', years: 2.7 },
  { month: '3월', years: 2.8 },
];

const economicValueData = [
  { month: '10월', recovery: 4500000, trend: 4200000 },
  { month: '11월', recovery: 5200000, trend: 4800000 },
  { month: '12월', recovery: 6800000, trend: 6100000 },
  { month: '1월', recovery: 5900000, trend: 5500000 },
  { month: '2월', recovery: 6300000, trend: 6000000 },
  { month: '3월', recovery: 7500000, trend: 7100000 },
];

const rawMaterialData = [
  { month: '10월', gold: 12, silver: 45, copper: 120, aluminum: 340, rare: 5 },
  { month: '11월', gold: 15, silver: 52, copper: 140, aluminum: 380, rare: 7 },
  { month: '12월', gold: 22, silver: 78, copper: 210, aluminum: 520, rare: 12 },
  { month: '1월', gold: 18, silver: 65, copper: 180, aluminum: 460, rare: 9 },
  { month: '2월', gold: 20, silver: 72, copper: 195, aluminum: 490, rare: 10 },
  { month: '3월', gold: 25, silver: 88, copper: 240, aluminum: 580, rare: 15 },
];

const costSavingData = [
  { name: '기존 방식', cost: 1200 },
  { name: 'K-ITAD', cost: 850 },
];

const resourceData = [
  { id: 1, title: '2024 ITAD 산업 동향 리포트', type: 'PDF', date: '2024-03-15', size: '2.4MB' },
  { id: 2, title: '데이터 완전 파기 기술 표준 가이드', type: 'PDF', date: '2024-02-28', size: '1.8MB' },
  { id: 3, title: 'K-ITAD 플랫폼 이용자 매뉴얼 (기업용)', type: 'PDF', date: '2024-01-20', size: '5.2MB' },
  { id: 4, title: 'ESG 경영을 위한 IT 자산 관리 전략', type: 'PDF', date: '2023-12-10', size: '3.1MB' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('emission');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);
  const [userRole, setUserRole] = useState<'emitter' | 'transporter' | 'processor' | 'government' | 'admin'>('emitter');
  const [userCompany, setUserCompany] = useState('K-ITAD 전자');
  const [settlementTab, setSettlementTab] = useState('status');
  const [showInquiryBoard, setShowInquiryBoard] = useState(false);
  const [supportTab, setSupportTab] = useState('board');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ category: '서비스 문의', title: '', company: '', name: '', email: '', phone: '', content: '', agreePrivacy: false });
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  // Emission Tab & Form State
  const [emissionTab, setEmissionTab] = useState<'form' | 'list'>('list');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmissionDetail, setSelectedEmissionDetail] = useState<string | null>(null);
  const [codCertModal, setCodCertModal] = useState<string | null>(null);
  const [emissionSearchQuery, setEmissionSearchQuery] = useState('');
  const [emissionStatusFilter, setEmissionStatusFilter] = useState('전체');

  // 배출신청 내역 Mock 데이터
  const [emissionRequests, setEmissionRequests] = useState([
    { id: 'DSP-2026-00123', company: 'SKT IT인프라팀', applicant: '홍길동', department: 'IT인프라팀', contact: '010-1234-5678', email: 'hong@skt.com', status: '운송중' as string, createdAt: '2026-03-20 09:30', assetCount: 8, assetSummary: 'Dell PowerEdge R740 외 7대', deletionGrade: '보안삭제(NIST 800-88)', collectionDate: '2026-03-22', address: '서울 강남구 테헤란로 521', processing: '재활용 우선', securityGrade: '기밀', transportId: 'TRN-2026-00051', totalWeight: '420kg' },
    { id: 'DSP-2026-00124', company: 'SKT IT인프라팀', applicant: '홍길동', department: 'IT인프라팀', contact: '010-1234-5678', email: 'hong@skt.com', status: '운송중' as string, createdAt: '2026-03-20 10:15', assetCount: 23, assetSummary: 'HP EliteDesk 800 외 22대', deletionGrade: '보안삭제(NIST 800-88)', collectionDate: '2026-03-22', address: '서울 서초구 반포대로 58', processing: '재활용 우선', securityGrade: '중요', transportId: 'TRN-2026-00052', totalWeight: '280kg' },
    { id: 'DSP-2026-00125', company: '현대모비스 DX실', applicant: '김현대', department: 'DX혁신팀', contact: '010-5555-6666', email: 'kim@mobis.com', status: '운송중' as string, createdAt: '2026-03-21 14:00', assetCount: 15, assetSummary: 'Lenovo ThinkStation 외 14대', deletionGrade: '완전파괴(DoD 5220.22-M)', collectionDate: '2026-03-23', address: '경기 성남시 분당구 판교로 256', processing: '물리파쇄 + 재활용', securityGrade: '일반', transportId: 'TRN-2026-00053', totalWeight: '600kg' },
    { id: 'DSP-2026-00120', company: 'SKT IT인프라팀', applicant: '홍길동', department: 'IT인프라팀', contact: '010-1234-5678', email: 'hong@skt.com', status: '처리완료' as string, createdAt: '2026-03-18 08:00', assetCount: 31, assetSummary: 'Dell Optiplex 7090 외 30대', deletionGrade: '보안삭제(NIST 800-88)', collectionDate: '2026-03-19', address: '서울 영등포구 여의대로 108', processing: '재활용 우선', securityGrade: '기밀', transportId: 'TRN-2026-00049', totalWeight: '350kg' },
    { id: 'DSP-2026-00121', company: '한화시스템', applicant: '이한화', department: '클라우드사업부', contact: '010-7777-8888', email: 'lee@hanwha.com', status: '처리완료' as string, createdAt: '2026-03-18 09:30', assetCount: 12, assetSummary: 'Samsung SSD PM9A3 외 11개', deletionGrade: '완전파괴(DoD 5220.22-M)', collectionDate: '2026-03-19', address: '서울 종로구 세종대로 175', processing: '물리파쇄', securityGrade: '중요', transportId: 'TRN-2026-00050', totalWeight: '96kg' },
    { id: 'DSP-2026-00126', company: 'SKT IT인프라팀', applicant: '홍길동', department: 'IT인프라팀', contact: '010-1234-5678', email: 'hong@skt.com', status: '신청완료' as string, createdAt: '2026-03-24 11:00', assetCount: 5, assetSummary: 'MacBook Pro 16 외 4대', deletionGrade: '보안삭제(NIST 800-88)', collectionDate: '2026-03-28', address: '서울 강남구 테헤란로 521', processing: '재활용 우선', securityGrade: '일반', transportId: '', totalWeight: '15kg' },
    { id: 'DSP-2026-00127', company: 'LG CNS', applicant: '박엘지', department: 'IT운영팀', contact: '010-9999-0000', email: 'park@lgcns.com', status: '접수확인' as string, createdAt: '2026-03-24 13:45', assetCount: 40, assetSummary: 'HP ProLiant DL380 외 39대', deletionGrade: '보안삭제(NIST 800-88)', collectionDate: '2026-03-30', address: '서울 마포구 월드컵북로 56길 19', processing: '재활용 우선', securityGrade: '기밀', transportId: '', totalWeight: '1,200kg' },
  ]);

  const filteredEmissions = emissionRequests.filter(e => {
    const matchStatus = emissionStatusFilter === '전체' || e.status === emissionStatusFilter;
    const matchSearch = emissionSearchQuery === '' || e.id.includes(emissionSearchQuery) || e.company.includes(emissionSearchQuery) || e.applicant.includes(emissionSearchQuery);
    return matchStatus && matchSearch;
  });

  const selectedEmissionData = emissionRequests.find(e => e.id === selectedEmissionDetail);
  const [formData, setFormData] = useState({
    // ... existing emission form data
    companyName: 'K-ITAD 전자 (로그인 연동)',
    applicantName: '',
    department: '',
    contact: '',
    email: '',
    assets: [] as any[],
    dataDeletion: false,
    deletionGrade: '보안삭제(NIST 800-88)',
    issueCertificate: true,
    securityRequirements: '',
    collectionDate: '',
    collectionTime: '오전(9-12)',
    address: '',
    addressDetail: '',
    floorLocation: '',
    elevator: '가능',
    onSiteContact: '',
    onSitePhone: '',
    processingMethods: [] as string[],
    settlementPreference: '정산 받겠음',
    esgReport: true,
    agreedTerms: false,
    agreedSecurity: false,
  });

  // Transport State
  const [selectedSettlement, setSelectedSettlement] = useState<string | null>(null);
  const [settlementStartDate, setSettlementStartDate] = useState('');
  const [settlementEndDate, setSettlementEndDate] = useState('');
  const [settlementDetailEmissionId, setSettlementDetailEmissionId] = useState<string | null>(null);
  const [infoTab, setInfoTab] = useState('회사정보');
  const [transportTab, setTransportTab] = useState<'dispatch' | 'integrity' | 'info' | 'monitoring'>('dispatch');
  const [selectedTransport, setSelectedTransport] = useState<string | null>('TRN-2026-00051');
  const [transportDetailModal, setTransportDetailModal] = useState<string | null>(null);
  const [transportFilter, setTransportFilter] = useState('전체');
  const [integrityFilter, setIntegrityFilter] = useState('전체');
  const [integritySearch, setIntegritySearch] = useState('');
  const [dispatchFilter, setDispatchFilter] = useState('전체');
  const [selectedDispatch, setSelectedDispatch] = useState<string | null>(null);
  const [dispatchForm, setDispatchForm] = useState({
    vehicleType: '1톤 보안차량',
    vehicleNumber: '',
    driverName: '',
    driverPhone: '',
    departDate: '',
    departTime: '',
    arrivalDate: '',
    arrivalTime: '',
    sealRequired: true,
    gpsTracking: true,
    securityPledge: true,
  });

  // Calendar dispatch state
  const [calendarAssignments, setCalendarAssignments] = useState<Record<string, { requestId: string; company: string; assetSummary: string }>>({});
  const [draggedRequest, setDraggedRequest] = useState<string | null>(null);
  const [dispatchDetailModal, setDispatchDetailModal] = useState<string | null>(null);
  const [driverDetailModal, setDriverDetailModal] = useState<string | null>(null);
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);

  const dispatchableEmissions = emissionRequests.filter(e => ['신청완료', '승인대기', '운송중'].includes(e.status));
  const getDispatchStatus = (emissionId: string) => {
    const t = transportMonitorData.transports.find(t => t.emissionId === emissionId);
    if (t) return '배차완료';
    return '배차대기';
  };

  // 유형별 수량 비교 데이터 (배출신청 vs 현장스캔)
  const getIntegrityByType = (transportId: string) => {
    const data: Record<string, {types: {type: string; registered: number; scanned: number; diff: number}[]; scannedAssets: {id: string; sn: string; type: string; manufacturer: string; model: string; status: string; scanTime: string; remark: string}[]; photos: string[]; memo: string}> = {
      'TRN-2026-00051': {
        types: [
          { type: 'Server', registered: 4, scanned: 4, diff: 0 },
          { type: 'Network', registered: 2, scanned: 2, diff: 0 },
          { type: 'Storage', registered: 2, scanned: 2, diff: 0 },
        ],
        scannedAssets: [
          { id: 'SCN-001', sn: 'SN-982341', type: 'Server', manufacturer: 'Dell', model: 'PowerEdge R740', status: 'matched', scanTime: '09:15', remark: '' },
          { id: 'SCN-002', sn: 'SN-982342', type: 'Server', manufacturer: 'Dell', model: 'PowerEdge R740', status: 'matched', scanTime: '09:16', remark: '' },
          { id: 'SCN-003', sn: 'SN-982343', type: 'Server', manufacturer: 'Dell', model: 'PowerEdge R740', status: 'matched', scanTime: '09:17', remark: '' },
          { id: 'SCN-004', sn: 'SN-982344', type: 'Server', manufacturer: 'Dell', model: 'PowerEdge R740', status: 'matched', scanTime: '09:18', remark: '' },
          { id: 'SCN-005', sn: 'SN-NET-001', type: 'Network', manufacturer: 'Cisco', model: 'Catalyst 9300', status: 'matched', scanTime: '09:20', remark: '' },
          { id: 'SCN-006', sn: 'SN-NET-002', type: 'Network', manufacturer: 'Cisco', model: 'Catalyst 9300', status: 'matched', scanTime: '09:21', remark: '' },
          { id: 'SCN-007', sn: 'SN-STO-001', type: 'Storage', manufacturer: 'NetApp', model: 'AFF A400', status: 'matched', scanTime: '09:23', remark: '' },
          { id: 'SCN-008', sn: 'SN-STO-002', type: 'Storage', manufacturer: 'NetApp', model: 'AFF A400', status: 'matched', scanTime: '09:24', remark: '' },
        ],
        photos: ['상차 전 전경', '봉인 완료'],
        memo: '전 자산 정상 확인. 서버룸 5층에서 엘리베이터 이용 반출.',
      },
      'TRN-2026-00052': {
        types: [
          { type: 'PC', registered: 15, scanned: 14, diff: -1 },
          { type: 'Notebook', registered: 6, scanned: 6, diff: 0 },
          { type: 'Monitor', registered: 2, scanned: 2, diff: 0 },
          { type: '미신청 자산', registered: 0, scanned: 1, diff: 1 },
        ],
        scannedAssets: [
          { id: 'SCN-101', sn: 'SN-HP-001', type: 'PC', manufacturer: 'HP', model: 'EliteDesk 800', status: 'matched', scanTime: '10:00', remark: '' },
          { id: 'SCN-123', sn: 'SN-UNK-001', type: 'PC', manufacturer: 'Dell', model: 'Optiplex 7090', status: 'unregistered', scanTime: '10:25', remark: '미신청 자산 — 포함 처리' },
        ],
        photos: ['상차 전 전경', '불일치 자산 사진', '봉인 완료'],
        memo: 'PC 1대 미발견 (타부서 이관). 미등록 Dell 1대 추가 발견, 포함 처리.',
      },
    };
    return data[transportId] || { types: [], scannedAssets: [], photos: [], memo: '' };
  };

  // Mock transport monitoring data
  const transportMonitorData = {
    summary: {
      todayTotal: { inProgress: 3, completed: 5, scheduled: 2 },
      routeDeviation: 0,
      sealIssues: 0,
      avgDuration: { value: '2시간 35분', change: -12 },
    },
    transports: [
      {
        id: 'TRN-2026-00051',
        emissionId: 'DSP-2026-00123',
        securityGrade: '기밀',
        from: '서울 강남구 테헤란로 521',
        to: 'ITAD 처리센터 인천',
        assetCount: 8,
        matchedCount: 8,
        status: '운송중' as string,
        sealStatus: '정상',
        departTime: '09:32',
        estimatedArrival: '11:45',
        driver: '김운송',
        driverPhone: '010-1234-5678',
        company: '보안물류(주)',
        sealNumber: 'SEAL-2026-8821',
        vehicle: '1톤 보안차량 (12가 3456)',
        timeline: [
          { step: '상차완료', time: '09:32', done: true },
          { step: '운송중', time: '09:45', done: true, active: true },
          { step: '도착', time: '', done: false },
          { step: '하차검수', time: '', done: false },
          { step: '인수완료', time: '', done: false },
        ],
        position: { lat: 37.4979, lng: 127.0276, progress: 45 },
        integrityResult: { matched: 8, mismatched: 0, unregistered: 0 },
      },
      {
        id: 'TRN-2026-00052',
        emissionId: 'DSP-2026-00124',
        securityGrade: '중요',
        from: '서울 서초구 반포대로 58',
        to: 'ITAD 처리센터 인천',
        assetCount: 23,
        matchedCount: 22,
        status: '운송중' as string,
        sealStatus: '정상',
        departTime: '10:15',
        estimatedArrival: '12:30',
        driver: '박배송',
        driverPhone: '010-5678-9012',
        company: '보안물류(주)',
        sealNumber: 'SEAL-2026-8822',
        vehicle: '2.5톤 보안차량 (34나 7890)',
        timeline: [
          { step: '상차완료', time: '10:15', done: true },
          { step: '운송중', time: '10:28', done: true, active: true },
          { step: '도착', time: '', done: false },
          { step: '하차검수', time: '', done: false },
          { step: '인수완료', time: '', done: false },
        ],
        position: { lat: 37.4835, lng: 126.9720, progress: 30 },
        integrityResult: { matched: 22, mismatched: 1, unregistered: 0 },
      },
      {
        id: 'TRN-2026-00053',
        emissionId: 'DSP-2026-00125',
        securityGrade: '일반',
        from: '경기 성남시 분당구 판교로 256',
        to: 'ITAD 처리센터 인천',
        assetCount: 15,
        matchedCount: 15,
        status: '운송중' as string,
        sealStatus: '정상',
        departTime: '08:50',
        estimatedArrival: '11:10',
        driver: '이기사',
        driverPhone: '010-3333-4444',
        company: 'IT보안운송(주)',
        sealNumber: 'SEAL-2026-8820',
        vehicle: '1톤 보안차량 (56다 1234)',
        timeline: [
          { step: '상차완료', time: '08:50', done: true },
          { step: '운송중', time: '09:05', done: true, active: true },
          { step: '도착', time: '', done: false },
          { step: '하차검수', time: '', done: false },
          { step: '인수완료', time: '', done: false },
        ],
        position: { lat: 37.3947, lng: 127.1112, progress: 60 },
        integrityResult: { matched: 15, mismatched: 0, unregistered: 0 },
      },
      {
        id: 'TRN-2026-00049',
        emissionId: 'DSP-2026-00120',
        securityGrade: '기밀',
        from: '서울 영등포구 여의대로 108',
        to: 'ITAD 처리센터 인천',
        assetCount: 31,
        matchedCount: 31,
        status: '완료' as string,
        sealStatus: '정상',
        departTime: '07:00',
        estimatedArrival: '09:15',
        driver: '최보안',
        driverPhone: '010-7777-8888',
        company: '보안물류(주)',
        sealNumber: 'SEAL-2026-8818',
        vehicle: '5톤 보안차량 (78라 5678)',
        timeline: [
          { step: '상차완료', time: '07:00', done: true },
          { step: '운송중', time: '07:12', done: true },
          { step: '도착', time: '09:08', done: true },
          { step: '하차검수', time: '09:15', done: true },
          { step: '인수완료', time: '09:22', done: true },
        ],
        position: { lat: 37.3960, lng: 126.6370, progress: 100 },
        integrityResult: { matched: 31, mismatched: 0, unregistered: 0 },
      },
      {
        id: 'TRN-2026-00050',
        emissionId: 'DSP-2026-00121',
        securityGrade: '중요',
        from: '서울 종로구 세종대로 175',
        to: 'ITAD 처리센터 인천',
        assetCount: 12,
        matchedCount: 12,
        status: '완료' as string,
        sealStatus: '정상',
        departTime: '07:30',
        estimatedArrival: '09:45',
        driver: '정안전',
        driverPhone: '010-1111-2222',
        company: 'IT보안운송(주)',
        sealNumber: 'SEAL-2026-8819',
        vehicle: '1톤 보안차량 (90마 9012)',
        timeline: [
          { step: '상차완료', time: '07:30', done: true },
          { step: '운송중', time: '07:42', done: true },
          { step: '도착', time: '09:38', done: true },
          { step: '하차검수', time: '09:45', done: true },
          { step: '인수완료', time: '09:52', done: true },
        ],
        position: { lat: 37.3960, lng: 126.6370, progress: 100 },
        integrityResult: { matched: 12, mismatched: 0, unregistered: 0 },
      },
    ],
    alerts: [
      { id: 1, type: '도착 완료', transport: 'TRN-2026-00049', time: '09:08', severity: 'info' as string },
      { id: 2, type: '인수 완료', transport: 'TRN-2026-00049', time: '09:22', severity: 'info' as string },
      { id: 3, type: '도착 완료', transport: 'TRN-2026-00050', time: '09:38', severity: 'info' as string },
      { id: 4, type: '인수 완료', transport: 'TRN-2026-00050', time: '09:52', severity: 'info' as string },
    ],
  };

  const selectedTransportData = transportMonitorData.transports.find(t => t.id === selectedTransport);

  // ===== 차량 애니메이션 (실시간 이동) =====
  const [vehicleAnimProgress, setVehicleAnimProgress] = useState<Record<string, number>>({
    'TRN-2026-00051': 0.45,
    'TRN-2026-00052': 0.30,
    'TRN-2026-00053': 0.60,
  });

  useEffect(() => {
    if (transportTab !== 'monitoring') return;
    const interval = setInterval(() => {
      setVehicleAnimProgress(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => {
          next[k] = Math.min(next[k] + 0.003 + Math.random() * 0.004, 0.95);
        });
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [transportTab]);

  // 경로 좌표 (출발지 → ITAD 처리센터 인천) - SVG viewBox 800x420 기준
  const vehicleRoutes: Record<string, { path: [number,number][]; color: string }> = {
    'TRN-2026-00051': { // 강남 → 인천
      path: [[680,310],[620,290],[560,260],[500,230],[440,200],[380,175],[320,155],[260,140],[200,120],[155,108]],
      color: '#10b981',
    },
    'TRN-2026-00052': { // 서초 → 인천
      path: [[650,350],[600,330],[540,305],[480,275],[420,250],[360,220],[300,190],[240,165],[190,140],[155,108]],
      color: '#f59e0b',
    },
    'TRN-2026-00053': { // 판교 → 인천
      path: [[720,380],[660,350],[600,310],[530,275],[460,240],[390,210],[330,180],[270,155],[210,130],[155,108]],
      color: '#6366f1',
    },
  };

  const getVehiclePos = (id: string): { x: number; y: number } => {
    const route = vehicleRoutes[id];
    const progress = vehicleAnimProgress[id] ?? 0;
    if (!route) return { x: 400, y: 200 };
    const pts = route.path;
    const totalSeg = pts.length - 1;
    const segF = progress * totalSeg;
    const segIdx = Math.min(Math.floor(segF), totalSeg - 1);
    const t = segF - segIdx;
    const [x1, y1] = pts[segIdx];
    const [x2, y2] = pts[segIdx + 1];
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
  };

  // ===== Disposal (데이터 폐기) State =====
  const [disposalTab, setDisposalTab] = useState<'receiving' | 'status' | 'work' | 'verify' | 'stats'>('receiving');
  const [receivingMonth, setReceivingMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [disposalStepFilter, setDisposalStepFilter] = useState('전체');
  const [disposalSearch, setDisposalSearch] = useState('');
  const [disposalMethodFilter, setDisposalMethodFilter] = useState('전체');
  const [disposalDelayOnly, setDisposalDelayOnly] = useState(false);
  const [selectedDisposalAsset, setSelectedDisposalAsset] = useState<string | null>(null);
  const [certChecked, setCertChecked] = useState<string[]>([]);
  const [selectedEmissionForDisposal, setSelectedEmissionForDisposal] = useState<string | null>(null);
  const [disposalCheckedAssets, setDisposalCheckedAssets] = useState<string[]>([]);
  const [disposalWorkForm, setDisposalWorkForm] = useState({
    method: '소프트웨어 삭제',
    grade: 'NIST 800-88',
    software: 'Blancco Drive Eraser 7.2',
    operator: '김보안',
    result: '성공',
    failReason: '',
  });

  // ===== 올바로 연동 State =====
  const [allbaroTab, setAllbaroTab] = useState<'manifest' | 'history' | 'verify' | 'result' | 'alerts'>('manifest');
  const [allbaroManifestFilter, setAllbaroManifestFilter] = useState('전체');
  const [allbaroSearch, setAllbaroSearch] = useState('');

  // 올바로 연동 Mock 데이터
  const allbaroData = {
    summary: {
      totalManifests: 48,
      pendingSubmit: 3,
      submitted: 42,
      rejected: 1,
      overdue: 2,
      syncRate: 97.9,
      lastSync: '2026-03-24 14:32',
    },
    manifests: [
      { id: 'ALB-2026-0048', emissionId: 'DSP-2026-00123', type: '전자인계서', wasteCode: '73-01-01', wasteName: '폐전자제품(서버)', quantity: '8대 (420kg)', emitter: 'SKT IT인프라팀', emitterBizNo: '104-81-12345', transporter: '보안물류(주)', transporterBizNo: '215-87-55678', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '재활용(R-4)', status: '제출대기' as string, createdAt: '2026-03-24 09:00', submittedAt: '', allbaroNo: '', dueDate: '2026-03-27' },
      { id: 'ALB-2026-0047', emissionId: 'DSP-2026-00124', type: '전자인계서', wasteCode: '73-01-02', wasteName: '폐전자제품(PC)', quantity: '23대 (280kg)', emitter: 'SKT IT인프라팀', emitterBizNo: '104-81-12345', transporter: '보안물류(주)', transporterBizNo: '215-87-55678', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '재활용(R-4)', status: '제출대기' as string, createdAt: '2026-03-24 08:30', submittedAt: '', allbaroNo: '', dueDate: '2026-03-27' },
      { id: 'ALB-2026-0046', emissionId: 'DSP-2026-00125', type: '전자인계서', wasteCode: '73-01-01', wasteName: '폐전자제품(서버)', quantity: '15대 (600kg)', emitter: '현대모비스 DX실', emitterBizNo: '220-81-67890', transporter: 'IT보안운송(주)', transporterBizNo: '301-86-22334', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '재활용(R-4)', status: '제출대기' as string, createdAt: '2026-03-23 15:00', submittedAt: '', allbaroNo: '', dueDate: '2026-03-26' },
      { id: 'ALB-2026-0045', emissionId: 'DSP-2026-00120', type: '전자인계서', wasteCode: '73-01-02', wasteName: '폐전자제품(노트북/PC)', quantity: '31대 (350kg)', emitter: 'SKT IT인프라팀', emitterBizNo: '104-81-12345', transporter: '보안물류(주)', transporterBizNo: '215-87-55678', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '재활용(R-4)', status: '제출완료' as string, createdAt: '2026-03-22 10:00', submittedAt: '2026-03-22 14:30', allbaroNo: 'AB-2026-031-0045', dueDate: '2026-03-25' },
      { id: 'ALB-2026-0044', emissionId: 'DSP-2026-00121', type: '전자인계서', wasteCode: '73-01-03', wasteName: '폐저장매체(HDD)', quantity: '12대 (96kg)', emitter: '한화시스템', emitterBizNo: '312-81-44556', transporter: 'IT보안운송(주)', transporterBizNo: '301-86-22334', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '물리파쇄(D-1)', status: '제출완료' as string, createdAt: '2026-03-21 09:00', submittedAt: '2026-03-21 11:15', allbaroNo: 'AB-2026-031-0044', dueDate: '2026-03-24' },
      { id: 'ALB-2026-0043', emissionId: 'DSP-2026-00119', type: '전자인계서', wasteCode: '73-01-01', wasteName: '폐전자제품(서버)', quantity: '6대 (310kg)', emitter: 'LG CNS', emitterBizNo: '110-81-77889', transporter: '보안물류(주)', transporterBizNo: '215-87-55678', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '재활용(R-4)', status: '반려' as string, createdAt: '2026-03-20 13:00', submittedAt: '2026-03-20 15:00', allbaroNo: '', dueDate: '2026-03-23', rejectReason: '폐기물 분류코드 불일치' },
      { id: 'ALB-2026-0042', emissionId: 'DSP-2026-00118', type: '처리실적보고', wasteCode: '73-01-02', wasteName: '폐전자제품(PC)', quantity: '18대 (210kg)', emitter: '삼성SDS', emitterBizNo: '124-81-55667', transporter: '보안물류(주)', transporterBizNo: '215-87-55678', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '재활용(R-4)', status: '제출완료' as string, createdAt: '2026-03-19 10:00', submittedAt: '2026-03-19 16:45', allbaroNo: 'AB-2026-031-0042', dueDate: '2026-03-22' },
      { id: 'ALB-2026-0041', emissionId: 'DSP-2026-00117', type: '처리실적보고', wasteCode: '73-01-03', wasteName: '폐저장매체(SSD)', quantity: '25개 (12kg)', emitter: '카카오', emitterBizNo: '120-87-65544', transporter: 'IT보안운송(주)', transporterBizNo: '301-86-22334', processor: 'K-ITAD 처리센터', processorBizNo: '131-86-99012', method: '소프트웨어삭제+재활용', status: '제출완료' as string, createdAt: '2026-03-18 14:00', submittedAt: '2026-03-18 17:20', allbaroNo: 'AB-2026-031-0041', dueDate: '2026-03-21' },
    ],
    verifiedCompanies: [
      { name: '보안물류(주)', bizNo: '215-87-55678', role: '수집운반', permitNo: '인천-제2026-수집-0012', permitExpiry: '2027-12-31', status: '유효', lastVerified: '2026-03-24 09:00', wasteTypes: ['73-01-01', '73-01-02', '73-01-03'] },
      { name: 'IT보안운송(주)', bizNo: '301-86-22334', role: '수집운반', permitNo: '경기-제2026-수집-0088', permitExpiry: '2027-06-30', status: '유효', lastVerified: '2026-03-24 09:00', wasteTypes: ['73-01-01', '73-01-02'] },
      { name: 'K-ITAD 처리센터', bizNo: '131-86-99012', role: '중간처리(재활용)', permitNo: '인천-제2026-처리-0005', permitExpiry: '2028-03-15', status: '유효', lastVerified: '2026-03-24 09:00', wasteTypes: ['73-01-01', '73-01-02', '73-01-03', '73-02-01'] },
      { name: '에코리사이클(주)', bizNo: '410-86-33221', role: '최종처리(매립)', permitNo: '충남-제2025-처리-0112', permitExpiry: '2026-05-01', status: '만료임박', lastVerified: '2026-03-23 15:00', wasteTypes: ['73-01-01'] },
    ],
    processingResults: [
      { month: '2026-01', recycled: 2800, incinerated: 120, landfill: 15, total: 2935, submittedCount: 12 },
      { month: '2026-02', recycled: 3200, incinerated: 95, landfill: 8, total: 3303, submittedCount: 15 },
      { month: '2026-03', recycled: 2400, incinerated: 80, landfill: 5, total: 2485, submittedCount: 11 },
    ],
    alerts: [
      { id: 1, type: '미제출 경고', message: 'ALB-2026-0046 전자인계서 제출기한 D-2', severity: 'warning' as string, time: '2026-03-24 09:00', read: false },
      { id: 2, type: '반려 알림', message: 'ALB-2026-0043 폐기물 분류코드 불일치로 반려됨', severity: 'error' as string, time: '2026-03-20 15:30', read: false },
      { id: 3, type: '허가만료 경고', message: '에코리사이클(주) 처리업 허가 2026-05-01 만료 예정', severity: 'warning' as string, time: '2026-03-23 15:00', read: true },
      { id: 4, type: '제출 완료', message: 'ALB-2026-0045 올바로 시스템 제출 완료 (AB-2026-031-0045)', severity: 'info' as string, time: '2026-03-22 14:30', read: true },
      { id: 5, type: '동기화 완료', message: '올바로 API 정기 동기화 완료 (48건 확인)', severity: 'info' as string, time: '2026-03-24 14:32', read: true },
      { id: 6, type: '제출 완료', message: 'ALB-2026-0044 올바로 시스템 제출 완료 (AB-2026-031-0044)', severity: 'info' as string, time: '2026-03-21 11:15', read: true },
      { id: 7, type: '기한초과', message: 'ALB-2026-0038, ALB-2026-0039 제출기한 초과 — 즉시 제출 필요', severity: 'error' as string, time: '2026-03-17 00:00', read: true },
    ],
  };

  const filteredManifests = allbaroData.manifests.filter(m => {
    const matchFilter = allbaroManifestFilter === '전체' || m.status === allbaroManifestFilter;
    const matchSearch = allbaroSearch === '' || m.id.includes(allbaroSearch) || m.emissionId.includes(allbaroSearch) || m.emitter.includes(allbaroSearch) || m.wasteName.includes(allbaroSearch);
    return matchFilter && matchSearch;
  });

  // ===== 자원 순환 (Circulation) State =====
  const [selectedCircStat, setSelectedCircStat] = useState('processing');
  const [selectedCircPeriod, setSelectedCircPeriod] = useState('최근 6개월');

  // ===== 리포트 센터 State =====
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // ===== 자산 처리 (Asset Processing) State =====
  const [processingTab, setProcessingTab] = useState<'inspection' | 'disassembly' | 'disposition' | 'stats'>('inspection');
  const [selectedProcessingAsset, setSelectedProcessingAsset] = useState<string | null>(null);
  const [processingFilter, setProcessingFilter] = useState('전체');
  const [processingStartDate, setProcessingStartDate] = useState('');
  const [processingEndDate, setProcessingEndDate] = useState('');
  const [addPartModal, setAddPartModal] = useState(false);
  const [newPartForm, setNewPartForm] = useState({ name: '', category: 'CPU', condition: '양호', route: '', material: '', weight: '', value: '' });
  const [selectedProcEmission, setSelectedProcEmission] = useState<string | null>(null);
  const [procCheckedAssets, setProcCheckedAssets] = useState<string[]>([]);
  const [procInspectionForm, setProcInspectionForm] = useState({
    appearance: '양호',
    working: '정상',
    verdict: '분해 대상',
    inspector: '정분해',
    note: '',
  });
  const [selectedDisassemblyAsset, setSelectedDisassemblyAsset] = useState<string | null>(null);
  const [procDispositionFilter, setProcDispositionFilter] = useState('전체');

  // 입고 대상 = 데이터폐기 완료 자산 (배출요청건별)
  const procIncomingAssets = [
    // DSP-2026-00123: K-ITAD 전자 — 폐기완료 2건
    { id: 'PRC-001', emissionId: 'DSP-2026-00123', assetId: 'AST-001', type: 'Server', model: 'Dell PowerEdge R740', company: 'K-ITAD 전자', department: 'IT인프라팀', stage: '분해완료' as string, appearance: '양호', working: '불량', verdict: '분해 대상' as string, inspector: '정분해', inspectedDate: '2026-03-23' },
    { id: 'PRC-002', emissionId: 'DSP-2026-00123', assetId: 'AST-007', type: 'Server', model: 'NetApp AFF A400', company: 'K-ITAD 전자', department: 'IT인프라팀', stage: '검수완료' as string, appearance: '양호', working: '정상', verdict: '재사용 가능' as string, inspector: '정분해', inspectedDate: '2026-03-23' },
    // DSP-2026-00120: 현대모비스 — 폐기완료 3건
    { id: 'PRC-003', emissionId: 'DSP-2026-00120', assetId: 'AST-013', type: 'Server', model: 'HP ProLiant DL380', company: '현대모비스', department: 'DX실', stage: '처분완료' as string, appearance: '양호', working: '불량', verdict: '분해 대상' as string, inspector: '정분해', inspectedDate: '2026-03-19' },
    { id: 'PRC-004', emissionId: 'DSP-2026-00120', assetId: 'AST-014', type: 'Server', model: 'HP ProLiant DL380', company: '현대모비스', department: 'DX실', stage: '분해중' as string, appearance: '양호', working: '불량', verdict: '분해 대상' as string, inspector: '정분해', inspectedDate: '2026-03-19' },
    { id: 'PRC-005', emissionId: 'DSP-2026-00120', assetId: 'AST-015', type: 'PC', model: 'Dell OptiPlex 5090', company: '현대모비스', department: 'DX실', stage: '검수대기' as string, appearance: '', working: '', verdict: '' as string, inspector: '', inspectedDate: '' },
  ];

  // 배출요청건별 그룹핑
  const procEmissionGroups = React.useMemo(() => {
    const groups: Record<string, { emissionId: string; company: string; department: string; totalCount: number; inspectedCount: number; assets: typeof procIncomingAssets }> = {};
    procIncomingAssets.forEach(a => {
      if (!groups[a.emissionId]) {
        groups[a.emissionId] = { emissionId: a.emissionId, company: a.company, department: a.department, totalCount: 0, inspectedCount: 0, assets: [] };
      }
      groups[a.emissionId].totalCount++;
      if (a.stage !== '검수대기') groups[a.emissionId].inspectedCount++;
      groups[a.emissionId].assets.push(a);
    });
    return Object.values(groups);
  }, []);

  const selectedProcAssets = selectedProcEmission ? procIncomingAssets.filter(a => a.emissionId === selectedProcEmission) : [];

  // 분해 부품 데이터
  const [procParts, setProcParts] = useState([
    // PRC-001 (Dell PowerEdge R740) — 분해완료
    { id: 'P-001-1', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: 'CPU (Xeon Gold 6248)', category: 'CPU', condition: '양호', route: '재제조' as string, material: '', weight: '0.3kg', value: '₩85,000', dispositionStatus: '출하완료' as string },
    { id: 'P-001-2', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: 'RAM DDR4 32GB x4', category: 'RAM', condition: '양호', route: '재제조' as string, material: '', weight: '0.4kg', value: '₩120,000', dispositionStatus: '출하완료' as string },
    { id: 'P-001-3', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: 'HDD Seagate Exos 18TB', category: 'Storage', condition: '폐기완료', route: '폐기' as string, material: '', weight: '0.8kg', value: '—', dispositionStatus: '소각완료' as string },
    { id: 'P-001-4', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: '파워서플라이 750W', category: 'PSU', condition: '양호', route: '재제조' as string, material: '', weight: '1.5kg', value: '₩35,000', dispositionStatus: '출하완료' as string },
    { id: 'P-001-5', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: '메인보드', category: 'PCB', condition: '수명초과', route: '재활용' as string, material: 'Au 0.3g, Cu 45g', weight: '1.2kg', value: '₩28,000', dispositionStatus: '납품완료' as string },
    { id: 'P-001-6', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: '섀시 (알루미늄)', category: 'Chassis', condition: '양호', route: '재활용' as string, material: 'Al 4.2kg', weight: '4.5kg', value: '₩12,000', dispositionStatus: '납품완료' as string },
    { id: 'P-001-7', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: '쿨링팬 x3', category: 'Cooling', condition: '불량', route: '폐기' as string, material: '', weight: '0.6kg', value: '—', dispositionStatus: '소각대기' as string },
    { id: 'P-001-8', parentId: 'PRC-001', parentAsset: 'AST-001', parentModel: 'Dell PowerEdge R740', name: '케이블류', category: 'Cable', condition: '—', route: '재활용' as string, material: 'Cu 0.5kg', weight: '0.8kg', value: '₩3,000', dispositionStatus: '납품완료' as string },
    // PRC-003 (HP ProLiant DL380) — 처분완료
    { id: 'P-003-1', parentId: 'PRC-003', parentAsset: 'AST-013', parentModel: 'HP ProLiant DL380', name: 'CPU (Xeon Silver 4214) x2', category: 'CPU', condition: '양호', route: '재제조' as string, material: '', weight: '0.6kg', value: '₩110,000', dispositionStatus: '출하완료' as string },
    { id: 'P-003-2', parentId: 'PRC-003', parentAsset: 'AST-013', parentModel: 'HP ProLiant DL380', name: 'RAM DDR4 64GB x8', category: 'RAM', condition: '양호', route: '재제조' as string, material: '', weight: '0.8kg', value: '₩280,000', dispositionStatus: '출하완료' as string },
    { id: 'P-003-3', parentId: 'PRC-003', parentAsset: 'AST-013', parentModel: 'HP ProLiant DL380', name: '메인보드', category: 'PCB', condition: '수명초과', route: '재활용' as string, material: 'Au 0.5g, Cu 60g', weight: '1.8kg', value: '₩45,000', dispositionStatus: '납품완료' as string },
    { id: 'P-003-4', parentId: 'PRC-003', parentAsset: 'AST-013', parentModel: 'HP ProLiant DL380', name: '섀시 (알루미늄)', category: 'Chassis', condition: '양호', route: '재활용' as string, material: 'Al 6.8kg', weight: '7.2kg', value: '₩18,000', dispositionStatus: '납품완료' as string },
    { id: 'P-003-5', parentId: 'PRC-003', parentAsset: 'AST-013', parentModel: 'HP ProLiant DL380', name: '파워서플라이 1200W x2', category: 'PSU', condition: '양호', route: '재제조' as string, material: '', weight: '3.2kg', value: '₩90,000', dispositionStatus: '출하완료' as string },
  ]);

  const assetProcessingData = {
    summary: {
      inspectionWaiting: procIncomingAssets.filter(a => a.stage === '검수대기').length,
      reusable: procIncomingAssets.filter(a => a.verdict === '재사용 가능').length,
      disassembling: procIncomingAssets.filter(a => a.stage === '분해중').length,
      completed: procIncomingAssets.filter(a => a.stage === '처분완료' || a.stage === '분해완료').length,
      totalParts: procParts.length,
      reuseRate: 28.5, recycleRate: 64.2, wasteRate: 7.3
    },
    dispositionStats: {
      monthly: [
        { month: '2026-01', reuse: 32, recycle: 78, partsRecovery: 18, waste: 8 },
        { month: '2026-02', reuse: 45, recycle: 92, partsRecovery: 24, waste: 6 },
        { month: '2026-03', reuse: 28, recycle: 65, partsRecovery: 15, waste: 5 },
      ],
      materialRecovery: [
        { material: '금 (Au)', recovered: '12.8g', value: '₩1,024,000', unit: 'g' },
        { material: '은 (Ag)', recovered: '45.2g', value: '₩58,760', unit: 'g' },
        { material: '구리 (Cu)', recovered: '186.5kg', value: '₩2,238,000', unit: 'kg' },
        { material: '알루미늄 (Al)', recovered: '342.0kg', value: '₩855,000', unit: 'kg' },
        { material: '철 (Fe)', recovered: '128.0kg', value: '₩115,200', unit: 'kg' },
        { material: '희토류', recovered: '0.8kg', value: '₩640,000', unit: 'kg' },
      ],
      economics: { resaleRevenue: 4250000, partsRevenue: 1850000, materialRevenue: 4930960, disposalCost: 380000, netValue: 10650960 },
    },
  };

  const filteredProcessingAssets = procIncomingAssets.filter(a =>
    processingFilter === '전체' || a.stage === processingFilter
  );

  const disposalSteps = ['대기', '폐기중', '완료'];
  const mapDisposalStep = (step: string) => step === '완료' ? '완료' : (step === '작업중' || step === '폐기 수행' || step === '검증대기' || step === '검증') ? '폐기중' : '대기';

  const disposalAssets = [
    // DSP-2026-00123: K-ITAD 전자 (8건)
    { id: 'DIS-001', assetId: 'AST-001', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'Dell PowerEdge R740', mediaType: 'HDD', mediaModel: 'Seagate Exos X18', serialNumber: 'WCT3E1234567', capacity: '18TB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '완료', operator: '김보안', operatorCert: 'NIST 인증 기사', scheduledDate: '2026-03-22', startDate: '2026-03-22 09:00', endDate: '2026-03-22 11:30', duration: '2시간 30분', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '3-pass', verification: 'Pass', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: 'CoD-2026-00456' },
    { id: 'DIS-002', assetId: 'AST-002', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'Dell PowerEdge R740', mediaType: 'SSD', mediaModel: 'Samsung PM9A3', serialNumber: 'S5GFNA0T12345', capacity: '3.84TB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '검증', operator: '김보안', operatorCert: 'NIST 인증 기사', scheduledDate: '2026-03-22', startDate: '2026-03-22 13:00', endDate: '', duration: '', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: 'Cryptographic Erase', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-003', assetId: 'AST-003', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'PC', model: 'HP EliteDesk 800', mediaType: 'HDD', mediaModel: 'WD Blue 1TB', serialNumber: 'WD-WMC3T0123456', capacity: '1TB', mediaStatus: '배드섹터', method: '물리파괴', step: '폐기 수행', operator: '박파쇄', operatorCert: 'e-Stewards 인증', scheduledDate: '2026-03-23', startDate: '2026-03-23 10:00', endDate: '', duration: '', standard: 'DoD 5220.22-M', software: '', algorithm: '', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-004', assetId: 'AST-004', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'PC', model: 'HP EliteDesk 800', mediaType: 'SSD', mediaModel: 'Samsung 870 EVO', serialNumber: 'S6B2NJ0T98765', capacity: '500GB', mediaStatus: '정상', method: '', step: '배정대기', operator: '', operatorCert: '', scheduledDate: '2026-03-24', startDate: '', endDate: '', duration: '', standard: '', software: '', algorithm: '', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-005', assetId: 'AST-005', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Notebook', model: 'Lenovo ThinkPad X1', mediaType: 'NVMe', mediaModel: 'Samsung 980 PRO', serialNumber: 'S69ENF0T55555', capacity: '1TB', mediaStatus: '정상', method: '', step: '배정대기', operator: '', operatorCert: '', scheduledDate: '2026-03-24', startDate: '', endDate: '', duration: '', standard: '', software: '', algorithm: '', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-006', assetId: 'AST-006', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Notebook', model: 'Lenovo ThinkPad X1', mediaType: 'NVMe', mediaModel: 'WD Black SN850X', serialNumber: 'WD-SN850X77777', capacity: '2TB', mediaStatus: '정상', method: '', step: '배정대기', operator: '', operatorCert: '', scheduledDate: '2026-03-25', startDate: '', endDate: '', duration: '', standard: '', software: '', algorithm: '', verification: '', delayed: true, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-007', assetId: 'AST-007', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'NetApp AFF A400', mediaType: 'SSD', mediaModel: 'NetApp NSE', serialNumber: 'NA-NSE-0011223', capacity: '7.68TB', mediaStatus: '정상', method: '복합처리', step: '완료', operator: '이기사', operatorCert: 'R2 인증', scheduledDate: '2026-03-21', startDate: '2026-03-21 14:00', endDate: '2026-03-21 17:45', duration: '3시간 45분', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '7-pass', verification: 'Pass', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: 'CoD-2026-00457' },
    { id: 'DIS-008', assetId: 'AST-008', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'NetApp AFF A400', mediaType: 'HDD', mediaModel: 'NetApp X448A', serialNumber: 'NA-X448A-99887', capacity: '8TB', mediaStatus: '인식불가', method: '물리파괴', step: '검증대기', operator: '박파쇄', operatorCert: 'e-Stewards 인증', scheduledDate: '2026-03-22', startDate: '2026-03-22 15:00', endDate: '2026-03-22 15:30', duration: '30분', standard: 'DoD 5220.22-M', software: '', algorithm: '', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    // DSP-2026-00124: SKT IT인프라팀 (4건)
    { id: 'DIS-009', assetId: 'AST-009', emissionId: 'DSP-2026-00124', transportId: 'TRN-2026-00052', type: 'PC', model: 'Dell OptiPlex 7090', mediaType: 'SSD', mediaModel: 'Samsung 870 EVO 500GB', serialNumber: 'S6B2NJ0T11111', capacity: '500GB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '작업중', operator: '김보안', operatorCert: 'NIST 인증 기사', scheduledDate: '2026-03-24', startDate: '2026-03-24 09:00', endDate: '', duration: '', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '3-pass', verification: '', delayed: false, company: 'SKT', department: 'IT인프라팀', securityGrade: '중요', certId: '' },
    { id: 'DIS-010', assetId: 'AST-010', emissionId: 'DSP-2026-00124', transportId: 'TRN-2026-00052', type: 'PC', model: 'Dell OptiPlex 7090', mediaType: 'SSD', mediaModel: 'Samsung 870 EVO 500GB', serialNumber: 'S6B2NJ0T22222', capacity: '500GB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '작업중', operator: '김보안', operatorCert: 'NIST 인증 기사', scheduledDate: '2026-03-24', startDate: '2026-03-24 09:30', endDate: '', duration: '', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '3-pass', verification: '', delayed: false, company: 'SKT', department: 'IT인프라팀', securityGrade: '중요', certId: '' },
    { id: 'DIS-011', assetId: 'AST-011', emissionId: 'DSP-2026-00124', transportId: 'TRN-2026-00052', type: 'Notebook', model: 'Lenovo ThinkPad T14', mediaType: 'NVMe', mediaModel: 'WD SN770 1TB', serialNumber: 'WD-SN770-33333', capacity: '1TB', mediaStatus: '정상', method: '', step: '배정대기', operator: '', operatorCert: '', scheduledDate: '2026-03-25', startDate: '', endDate: '', duration: '', standard: '', software: '', algorithm: '', verification: '', delayed: false, company: 'SKT', department: 'IT인프라팀', securityGrade: '중요', certId: '' },
    { id: 'DIS-012', assetId: 'AST-012', emissionId: 'DSP-2026-00124', transportId: 'TRN-2026-00052', type: 'Notebook', model: 'Lenovo ThinkPad T14', mediaType: 'NVMe', mediaModel: 'WD SN770 1TB', serialNumber: 'WD-SN770-44444', capacity: '1TB', mediaStatus: '정상', method: '', step: '배정대기', operator: '', operatorCert: '', scheduledDate: '2026-03-25', startDate: '', endDate: '', duration: '', standard: '', software: '', algorithm: '', verification: '', delayed: false, company: 'SKT', department: 'IT인프라팀', securityGrade: '중요', certId: '' },
    // DSP-2026-00120: 현대모비스 (3건) - 전체 완료
    { id: 'DIS-013', assetId: 'AST-013', emissionId: 'DSP-2026-00120', transportId: 'TRN-2026-00048', type: 'Server', model: 'HP ProLiant DL380', mediaType: 'HDD', mediaModel: 'Seagate Exos 16TB', serialNumber: 'WCT5E7777777', capacity: '16TB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '완료', operator: '이기사', operatorCert: 'R2 인증', scheduledDate: '2026-03-18', startDate: '2026-03-18 09:00', endDate: '2026-03-18 12:00', duration: '3시간', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '3-pass', verification: 'Pass', delayed: false, company: '현대모비스', department: 'DX실', securityGrade: '극비', certId: 'CoD-2026-00440' },
    { id: 'DIS-014', assetId: 'AST-014', emissionId: 'DSP-2026-00120', transportId: 'TRN-2026-00048', type: 'Server', model: 'HP ProLiant DL380', mediaType: 'HDD', mediaModel: 'Seagate Exos 16TB', serialNumber: 'WCT5E8888888', capacity: '16TB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '완료', operator: '이기사', operatorCert: 'R2 인증', scheduledDate: '2026-03-18', startDate: '2026-03-18 13:00', endDate: '2026-03-18 16:00', duration: '3시간', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '3-pass', verification: 'Pass', delayed: false, company: '현대모비스', department: 'DX실', securityGrade: '극비', certId: 'CoD-2026-00440' },
    { id: 'DIS-015', assetId: 'AST-015', emissionId: 'DSP-2026-00120', transportId: 'TRN-2026-00048', type: 'PC', model: 'Dell OptiPlex 5090', mediaType: 'SSD', mediaModel: 'Samsung 870 EVO', serialNumber: 'S6B2NJ0T55555', capacity: '500GB', mediaStatus: '인식불가', method: '물리파괴', step: '완료', operator: '박파쇄', operatorCert: 'e-Stewards 인증', scheduledDate: '2026-03-19', startDate: '2026-03-19 10:00', endDate: '2026-03-19 10:15', duration: '15분', standard: 'DoD 5220.22-M', software: '', algorithm: '', verification: 'Pass', delayed: false, company: '현대모비스', department: 'DX실', securityGrade: '극비', certId: 'CoD-2026-00440' },
  ];

  // 배출요청건별 그룹핑 데이터
  const disposalEmissionGroups = React.useMemo(() => {
    const groups: Record<string, { emissionId: string; company: string; department: string; securityGrade: string; totalCount: number; completedCount: number; inProgressCount: number; waitingCount: number; assets: typeof disposalAssets }> = {};
    disposalAssets.forEach(a => {
      if (!groups[a.emissionId]) {
        groups[a.emissionId] = { emissionId: a.emissionId, company: a.company, department: a.department, securityGrade: a.securityGrade, totalCount: 0, completedCount: 0, inProgressCount: 0, waitingCount: 0, assets: [] };
      }
      groups[a.emissionId].totalCount++;
      if (a.step === '완료') groups[a.emissionId].completedCount++;
      else if (a.step === '작업중' || a.step === '폐기 수행') groups[a.emissionId].inProgressCount++;
      else groups[a.emissionId].waitingCount++;
      groups[a.emissionId].assets.push(a);
    });
    return Object.values(groups);
  }, []);

  const selectedEmissionAssets = selectedEmissionForDisposal ? disposalAssets.filter(a => a.emissionId === selectedEmissionForDisposal) : [];

  const disposalCerts = [
    { id: 'CoD-2026-00456', emissionId: 'DSP-2026-00123', assetCount: 1, method: '소프트웨어 삭제', standard: 'NIST 800-88', issueDate: '2026-03-22', status: '유효', company: 'K-ITAD 전자', processor: '㈜그린ITAD', processorCert: 'R2 / e-Stewards' },
    { id: 'CoD-2026-00457', emissionId: 'DSP-2026-00123', assetCount: 1, method: '복합처리', standard: 'NIST 800-88', issueDate: '2026-03-21', status: '유효', company: 'K-ITAD 전자', processor: '㈜그린ITAD', processorCert: 'R2 / e-Stewards' },
    { id: 'CoD-2026-00440', emissionId: 'DSP-2026-00120', assetCount: 5, method: '소프트웨어 삭제', standard: 'DoD 5220.22-M', issueDate: '2026-03-18', status: '유효', company: 'SKT', processor: '㈜그린ITAD', processorCert: 'R2' },
    { id: 'CoD-2026-00435', emissionId: 'DSP-2026-00118', assetCount: 12, method: '물리파괴', standard: 'NIST 800-88', issueDate: '2026-03-15', status: '유효', company: '삼성전자', processor: '㈜에코ITAD', processorCert: 'e-Stewards' },
    { id: 'CoD-2026-00410', emissionId: 'DSP-2026-00105', assetCount: 8, method: '디가우징', standard: '자체기준', issueDate: '2026-02-28', status: '만료', company: 'LG전자', processor: '㈜그린ITAD', processorCert: 'R2' },
  ];

  const disposalCompletedCount = disposalAssets.filter(a => a.step === '완료').length;
  const disposalTotalCount = disposalAssets.length;
  const disposalCompletionRate = Math.round((disposalCompletedCount / disposalTotalCount) * 100);
  const disposalPendingCount = disposalAssets.filter(a => a.step !== '완료').length;
  const selectedDisposalData = disposalAssets.find(a => a.id === selectedDisposalAsset);

  // disposal chart data
  const disposalMethodChartData = [
    { name: '소프트웨어 삭제', value: 45, color: '#6366f1' },
    { name: '디가우징', value: 15, color: '#f59e0b' },
    { name: '물리파괴', value: 30, color: '#ef4444' },
    { name: '복합처리', value: 10, color: '#10b981' },
  ];
  const disposalMonthlyData = [
    { month: '10월', count: 42, capacity: 120 },
    { month: '11월', count: 56, capacity: 180 },
    { month: '12월', count: 38, capacity: 95 },
    { month: '1월', count: 65, capacity: 210 },
    { month: '2월', count: 71, capacity: 250 },
    { month: '3월', count: 48, capacity: 155 },
  ];
  const disposalMediaTypeData = [
    { month: '10월', HDD: 25, SSD: 12, NVMe: 5 },
    { month: '11월', HDD: 30, SSD: 18, NVMe: 8 },
    { month: '12월', HDD: 18, SSD: 14, NVMe: 6 },
    { month: '1월', HDD: 35, SSD: 20, NVMe: 10 },
    { month: '2월', HDD: 38, SSD: 22, NVMe: 11 },
    { month: '3월', HDD: 25, SSD: 16, NVMe: 7 },
  ];
  const disposalAvgTimeData = [
    { method: '소프트웨어 삭제', time: 150 },
    { method: '디가우징', time: 30 },
    { method: '물리파괴', time: 20 },
    { method: '복합처리', time: 200 },
  ];

  const [currentAsset, setCurrentAsset] = useState({
    type: 'PC',
    manufacturer: '',
    model: '',
    quantity: 1,
    year: '',
    assetNo: '',
    condition: '양호',
    photos: [] as string[],
    remarks: ''
  });

  const addAsset = () => {
    setFormData({ ...formData, assets: [...formData.assets, { ...currentAsset, id: Date.now() }] });
    setCurrentAsset({
      type: 'PC',
      manufacturer: '',
      model: '',
      quantity: 1,
      year: '',
      assetNo: '',
      condition: '양호',
      photos: [],
      remarks: ''
    });
  };

  const removeAsset = (id: number) => {
    setFormData({ ...formData, assets: formData.assets.filter(a => a.id !== id) });
  };

  const roleConfig: Record<string, { label: string; company: string; menus: string[]; defaultTab: string }> = {
    emitter:     { label: '배출자', company: 'K-ITAD 전자', menus: ['emission', 'settlement', 'circulation', 'allbaro', 'info', 'settings'], defaultTab: 'emission' },
    transporter: { label: '운송회사', company: '보안물류(주)', menus: ['transport', 'settlement', 'allbaro', 'info', 'settings'], defaultTab: 'transport' },
    processor:   { label: '처리사', company: 'ITAD 처리센터', menus: ['emission', 'transport', 'disposal', 'processing', 'settlement', 'circulation', 'allbaro', 'info', 'settings'], defaultTab: 'emission' },
    government:  { label: '정부기관', company: '환경부', menus: ['circulation', 'settings'], defaultTab: 'circulation' },
    admin:       { label: '협회관리자', company: 'K-ITAD 협회', menus: ['emission', 'transport', 'disposal', 'processing', 'settlement', 'circulation', 'allbaro', 'settings'], defaultTab: 'emission' },
  };

  const allNavItems = [
    { id: 'emission', label: '배출관리', icon: FileText },
    { id: 'transport', label: '운송관리', icon: Truck },
    { id: 'disposal', label: '데이터폐기', icon: ShieldCheck },
    { id: 'processing', label: '자산처리', icon: Cog },
    { id: 'settlement', label: '정산관리', icon: CircleDollarSign },
    { id: 'circulation', label: '통계/리포트', icon: BarChart3 },
    { id: 'allbaro', label: '올바로연동', icon: Link2 },
    { id: 'info', label: '정보관리', icon: Building2 },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  const navItems = allNavItems.filter(item => roleConfig[userRole]?.menus.includes(item.id));

  const renderContent = () => {
    switch (activeTab) {
      case 'emission':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 pb-20"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">배출관리</h1>
                <p className="text-slate-500 mt-1">배출신청 내역을 확인하고 관리합니다.</p>
              </div>
              {userRole === 'emitter' && emissionTab === 'list' && !selectedEmissionDetail && (
                <button onClick={() => setEmissionTab('form')}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  배출신청
                </button>
              )}
            </div>

            {/* ===== 배출신청 확인 탭 ===== */}
            {!selectedEmissionDetail && (
              <div className="space-y-4">
                {/* 필터/검색/기간 */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl">
                    {['전체', '신청완료', '접수확인', '운송중', '데이터폐기중', '처리완료'].map(f => (
                      <button key={f} onClick={() => setEmissionStatusFilter(f)}
                        className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          emissionStatusFilter === f ? "bg-emerald-600 text-white" : "text-slate-500 hover:bg-slate-50"
                        )}>{f}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="date" className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    <span className="text-slate-400 text-xs">~</span>
                    <input type="date" className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                  <div className="flex-1"></div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={emissionSearchQuery} onChange={e => setEmissionSearchQuery(e.target.value)}
                      placeholder="신청번호, 기업명, 신청자 검색..."
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                </div>

                {/* 신청 내역 테이블 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 font-bold text-slate-600">신청번호</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">신청일</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">기업/신청자</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">자산</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">수거일</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">상태</th>
                        <th className="text-center px-4 py-3 font-bold text-slate-600">인증서</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmissions.map(e => (
                        <tr key={e.id} onClick={() => setSelectedEmissionDetail(e.id)} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                          <td className="px-4 py-3 font-bold text-emerald-700">{e.id}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{e.createdAt}</td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-700">{e.company}</span>
                            <p className="text-[11px] text-slate-400">{e.applicant} · {e.department}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-700">{e.assetCount}대</span>
                            <p className="text-[11px] text-slate-400 truncate max-w-[160px]">{e.assetSummary}</p>
                          </td>
                          <td className="px-4 py-3 text-slate-600 text-xs font-bold">{e.collectionDate}</td>
                          <td className="px-4 py-3">
                            <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                              e.status === '신청완료' ? "bg-blue-100 text-blue-700" :
                              e.status === '접수확인' ? "bg-amber-100 text-amber-700" :
                              e.status === '운송중' ? "bg-indigo-100 text-indigo-700" :
                              e.status === '데이터폐기중' ? "bg-violet-100 text-violet-700" :
                              "bg-emerald-100 text-emerald-700"
                            )}>{e.status}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {e.status === '처리완료' ? (
                              <button
                                onClick={(ev) => { ev.stopPropagation(); setCodCertModal(e.id); }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[11px] font-bold hover:bg-emerald-100 transition-all"
                              >
                                <Download className="w-3.5 h-3.5" />
                                CoD
                              </button>
                            ) : (
                              <span className="text-xs text-slate-300">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredEmissions.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                      <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-bold">검색 결과가 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ===== CoD 인증서 인라인 섹션 ===== */}
            {codCertModal && (() => {
              const emission = emissionRequests.find(e => e.id === codCertModal);
              if (!emission) return null;
              // Mock 자산별 CoD 데이터
              const codAssets = Array.from({ length: emission.assetCount }, (_, i) => ({
                id: `COD-${codCertModal?.replace('DSP-', '')}-${String(i + 1).padStart(3, '0')}`,
                assetId: `AST-${String(i + 1).padStart(4, '0')}`,
                type: ['서버', '노트북', '데스크탑', 'PC', '모니터', '네트워크장비'][i % 6],
                model: ['Dell PowerEdge R740', 'Dell Latitude 5520', 'HP EliteDesk 800', 'Lenovo ThinkPad T14', 'Samsung S24', 'Cisco Catalyst 9200'][i % 6],
                serial: `SN${String(Math.floor(Math.random() * 9000000 + 1000000))}`,
                method: emission.deletionGrade,
                result: i === 0 && emission.assetCount > 5 ? '물리파쇄' : '소프트웨어 삭제',
                standard: emission.deletionGrade.includes('NIST') ? 'NIST 800-88 Rev.1' : 'DoD 5220.22-M',
                operator: ['김보안', '이데이터', '박폐기'][i % 3],
                date: '2026-03-' + String(20 + (i % 5)).padStart(2, '0'),
                status: '검증완료',
              }));
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden mt-6"
                >
                  {/* 헤더 */}
                  <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-emerald-50/50">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <FileBadge className="w-5 h-5 text-emerald-600" />
                        데이터파기 인증서 (CoD)
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        배출신청 <span className="font-bold text-emerald-600">{codCertModal}</span> · {emission.company} · 총 {emission.assetCount}건
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert('전체 인증서 ZIP 다운로드')}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" /> 전체 다운로드 (ZIP)
                      </button>
                      <button onClick={() => setCodCertModal(null)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5" /> 접기
                      </button>
                    </div>
                  </div>

                  {/* 요약 */}
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold">총 자산</p>
                        <p className="text-lg font-black text-slate-900">{emission.assetCount}건</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold">폐기 완료</p>
                        <p className="text-lg font-black text-emerald-600">{emission.assetCount}건</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold">폐기 기준</p>
                        <p className="text-sm font-bold text-slate-700">{emission.deletionGrade.split('(')[0]}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold">인증 상태</p>
                        <p className="text-sm font-bold text-emerald-600">✓ 전체 검증완료</p>
                      </div>
                    </div>
                  </div>

                  {/* 자산별 인증서 목록 */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">인증서 번호</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">분류</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">모델명</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">시리얼</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">폐기방식</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">기준</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">작업자</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">완료일</th>
                          <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase text-center">다운로드</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {codAssets.map(asset => (
                          <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-xs font-bold text-emerald-700 font-mono">{asset.id}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold">{asset.type}</span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">{asset.model}</td>
                            <td className="px-4 py-3 text-xs text-slate-500 font-mono">{asset.serial}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{asset.result}</td>
                            <td className="px-4 py-3 text-[11px] text-slate-500">{asset.standard}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{asset.operator}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{asset.date}</td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => alert(`${asset.id} 인증서 PDF 다운로드`)}
                                className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 하단 */}
                  <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                    <p className="text-[11px] text-slate-400">인증기관: K-ITAD 협회 · 처리사: ITAD 처리센터 (R2/e-Stewards 인증)</p>
                    <button onClick={() => setCodCertModal(null)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">접기</button>
                  </div>
                </motion.div>
              );
            })()}

            {/* ===== 배출신청 상세 보기 ===== */}
            {selectedEmissionDetail && selectedEmissionData && (
              <div className="space-y-4">
                <button onClick={() => setSelectedEmissionDetail(null)}
                  className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
                </button>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* 상세 헤더 */}
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{selectedEmissionData.id}</h3>
                        <p className="text-sm text-slate-400">신청일: {selectedEmissionData.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn("px-3 py-1.5 rounded-lg text-sm font-bold",
                        selectedEmissionData.status === '신청완료' ? "bg-blue-100 text-blue-700" :
                        selectedEmissionData.status === '접수확인' ? "bg-amber-100 text-amber-700" :
                        selectedEmissionData.status === '운송중' ? "bg-indigo-100 text-indigo-700" :
                        selectedEmissionData.status === '데이터폐기중' ? "bg-violet-100 text-violet-700" :
                        "bg-emerald-100 text-emerald-700"
                      )}>{selectedEmissionData.status}</span>
                      {userRole === 'processor' && selectedEmissionData.status === '신청완료' && (
                        <button onClick={() => {
                          setEmissionRequests(prev => prev.map(r => r.id === selectedEmissionData.id ? {...r, status: '접수확인'} : r));
                        }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> 접수완료
                        </button>
                      )}
                      {userRole === 'emitter' && (selectedEmissionData.status === '신청완료' || selectedEmissionData.status === '접수확인') && (
                        <>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5">
                            <Edit3 className="w-4 h-4" /> 수정
                          </button>
                          <button onClick={() => {
                            if (confirm(`${selectedEmissionData.id} 배출신청을 삭제하시겠습니까?`)) {
                              setEmissionRequests(prev => prev.filter(r => r.id !== selectedEmissionData.id));
                              setSelectedEmissionDetail(null);
                            }
                          }} className="px-4 py-2 bg-rose-100 text-rose-700 rounded-xl text-sm font-bold hover:bg-rose-200 transition-all flex items-center gap-1.5">
                            <X className="w-4 h-4" /> 삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 상세 내용 */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 신청자 정보 */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> 신청자 정보
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: '기업명', value: selectedEmissionData.company },
                          { label: '신청자', value: selectedEmissionData.applicant },
                          { label: '부서', value: selectedEmissionData.department },
                          { label: '연락처', value: selectedEmissionData.contact },
                          { label: '이메일', value: selectedEmissionData.email },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-slate-500">{item.label}</span>
                            <span className="font-bold text-slate-800">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 배출 정보 */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5" /> 배출 정보
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: '자산 수량', value: `${selectedEmissionData.assetCount}대 (${selectedEmissionData.totalWeight})` },
                          { label: '자산 요약', value: selectedEmissionData.assetSummary },
                          { label: '예상정산금액', value: `${(selectedEmissionData.assetCount * 60000).toLocaleString()}원` },
                          { label: '삭제 등급', value: selectedEmissionData.deletionGrade },
                          { label: '처리 방식', value: selectedEmissionData.processing },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-slate-500">{item.label}</span>
                            <span className="font-bold text-slate-800">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 수거 정보 */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" /> 수거/운송 정보
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: '수거 예정일', value: selectedEmissionData.collectionDate },
                          { label: '수거 주소', value: selectedEmissionData.address },
                          { label: '운송번호', value: selectedEmissionData.transportId || '미배정' },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-slate-500">{item.label}</span>
                            <span className={cn("font-bold", item.value === '미배정' ? "text-slate-400" : "text-slate-800")}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 처리 타임라인 */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> 처리 진행상황
                      </h4>
                      <div className="space-y-0">
                        {[
                          { step: '신청완료', done: true },
                          { step: '접수확인', done: ['접수확인', '운송중', '데이터폐기중', '처리완료'].includes(selectedEmissionData.status) },
                          { step: '운송중', done: ['운송중', '데이터폐기중', '처리완료'].includes(selectedEmissionData.status), active: selectedEmissionData.status === '운송중' },
                          { step: '데이터폐기중', done: ['데이터폐기중', '처리완료'].includes(selectedEmissionData.status), active: selectedEmissionData.status === '데이터폐기중' },
                          { step: '처리완료', done: selectedEmissionData.status === '처리완료' },
                        ].map((s, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                              <div className={cn("w-7 h-7 rounded-full flex items-center justify-center border-2",
                                s.active ? "bg-indigo-600 border-indigo-600" :
                                s.done ? "bg-emerald-500 border-emerald-500" :
                                "bg-white border-slate-200"
                              )}>
                                {s.done && !s.active && <Check className="w-3.5 h-3.5 text-white" />}
                                {s.active && <Radio className="w-3.5 h-3.5 text-white" />}
                                {!s.done && !s.active && <div className="w-2 h-2 rounded-full bg-slate-200" />}
                              </div>
                              {i < 4 && <div className={cn("w-0.5 h-6", s.done ? "bg-emerald-300" : "bg-slate-200")} />}
                            </div>
                            <span className={cn("text-sm font-bold",
                              s.active ? "text-indigo-600" : s.done ? "text-slate-800" : "text-slate-400"
                            )}>{s.step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== 신규 배출신청 폼 ===== */}
            {/* 배출신청 모달 */}
            {emissionTab === 'form' && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-6 overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) setEmissionTab('list'); }}>
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative mb-8" onClick={(e) => e.stopPropagation()}>
              <div className="px-8 pt-6 pb-0 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900">배출신청</h2>
                <button onClick={() => setEmissionTab('list')} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="px-8 pb-8 pt-4 space-y-6">

            {/* Step Indicator */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-emerald-500 transition-all duration-500 -z-0" 
                  style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                ></div>
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                      currentStep >= step ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white border-2 border-slate-200 text-slate-400"
                    )}>
                      {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    <span className={cn(
                      "text-xs font-bold whitespace-nowrap",
                      currentStep >= step ? "text-emerald-600" : "text-slate-400"
                    )}>
                      {step === 1 && "신청자 정보"}
                      {step === 2 && "배출 자산"}
                      {step === 3 && "데이터 삭제"}
                      {step === 4 && "수거 정보"}
                      {step === 5 && "예상금액"}
                      {step === 6 && "확인 및 제출"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Step Content */}
              <div className="p-8 lg:p-12">
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">STEP 1. 신청자 정보</h3>
                      <p className="text-slate-500 text-sm mt-1">배출 신청을 진행하는 담당자 정보를 확인 및 입력해 주세요.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">회사명</label>
                        <input 
                          type="text" 
                          value={formData.companyName} 
                          disabled 
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">신청자명</label>
                        <input 
                          type="text" 
                          placeholder="성함을 입력하세요"
                          value={formData.applicantName}
                          onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">부서</label>
                        <div className="flex flex-col gap-2">
                          <select 
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                            value={formData.department === 'IT기획팀' || formData.department === '자산관리팀' || formData.department === '인사총무팀' || formData.department === '보안팀' || formData.department === '' ? formData.department : '직접입력'}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '직접입력') {
                                setFormData({...formData, department: ''});
                              } else {
                                setFormData({...formData, department: val});
                              }
                            }}
                          >
                            <option value="">선택</option>
                            <option value="IT기획팀">IT기획팀</option>
                            <option value="자산관리팀">자산관리팀</option>
                            <option value="인사총무팀">인사총무팀</option>
                            <option value="보안팀">보안팀</option>
                            <option value="직접입력">직접입력</option>
                          </select>
                          {(formData.department !== 'IT기획팀' && formData.department !== '자산관리팀' && formData.department !== '인사총무팀' && formData.department !== '보안팀' && formData.department !== '') || (formData.department === '' && true /* logic to show if '직접입력' was selected */) ? (
                            <input 
                              type="text" 
                              placeholder="부서명 직접 입력"
                              value={formData.department}
                              onChange={(e) => setFormData({...formData, department: e.target.value})}
                              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">연락처</label>
                        <input 
                          type="tel" 
                          placeholder="010-0000-0000"
                          value={formData.contact}
                          onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700">이메일</label>
                        <input 
                          type="email" 
                          placeholder="example@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="border-b border-slate-100 pb-4 flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">STEP 2. 배출 자산 정보</h3>
                        <p className="text-slate-500 text-sm mt-1">자산을 개별 등록하거나 엑셀로 일괄 업로드할 수 있습니다.</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => alert('배출자산_업로드_템플릿.xlsx 다운로드가 시작됩니다.')}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          템플릿 다운로드
                        </button>
                        <label className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors cursor-pointer">
                          <PlusCircle className="w-4 h-4" />
                          엑셀 일괄 업로드
                          <input 
                            type="file" 
                            className="hidden" 
                            accept=".xlsx, .xls"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                alert(`${e.target.files[0].name} 파일이 업로드되었습니다. 15건의 자산이 자동 등록되었습니다.`);
                                // Mock data addition
                                const mockAssets = [
                                  { id: Date.now() + 1, type: '노트북', manufacturer: 'Samsung', model: 'Galaxy Book 3', quantity: 5, year: '2023', assetNo: 'ASSET-001', condition: '양호', photos: [], remarks: '일괄 업로드' },
                                  { id: Date.now() + 2, type: '모니터', manufacturer: 'LG', model: '27UP850', quantity: 10, year: '2022', assetNo: 'ASSET-002', condition: '양호', photos: [], remarks: '일괄 업로드' },
                                ];
                                setFormData({...formData, assets: [...formData.assets, ...mockAssets]});
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* 개별 자산 추가 폼 (상단) */}
                      <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">자산 유형</label>
                            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none" value={currentAsset.type} onChange={(e) => setCurrentAsset({...currentAsset, type: e.target.value})}>
                              <option>PC</option><option>노트북</option><option>서버</option><option>모니터</option><option>모바일</option><option>네트워크장비</option><option>프린터</option><option>기타</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">제조사</label>
                            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                              value={['Samsung', 'HP', 'Dell', 'Lenovo', 'Apple', 'LG', ''].includes(currentAsset.manufacturer) ? currentAsset.manufacturer : '직접입력'}
                              onChange={(e) => { if (e.target.value === '직접입력') { setCurrentAsset({...currentAsset, manufacturer: ''}); } else { setCurrentAsset({...currentAsset, manufacturer: e.target.value}); } }}>
                              <option value="">선택</option><option value="Samsung">Samsung</option><option value="HP">HP</option><option value="Dell">Dell</option><option value="Lenovo">Lenovo</option><option value="Apple">Apple</option><option value="LG">LG</option><option value="직접입력">직접입력</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">모델명</label>
                            <input type="text" placeholder="모델명" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none" value={currentAsset.model} onChange={(e) => setCurrentAsset({...currentAsset, model: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">수량</label>
                            <input type="number" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none" value={currentAsset.quantity} onChange={(e) => setCurrentAsset({...currentAsset, quantity: parseInt(e.target.value) || 0})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">제조연도 (선택)</label>
                            <input type="text" placeholder="YYYY" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none" value={currentAsset.year} onChange={(e) => setCurrentAsset({...currentAsset, year: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">자산번호 (선택)</label>
                            <input type="text" placeholder="사내 관리번호" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none" value={currentAsset.assetNo} onChange={(e) => setCurrentAsset({...currentAsset, assetNo: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">외관 상태</label>
                            <div className="flex gap-1.5">
                              {['양호', '경미손상', '파손', '전원불가'].map(s => (
                                <button key={s} onClick={() => setCurrentAsset({...currentAsset, condition: s})}
                                  className={cn("px-2.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap", currentAsset.condition === s ? "bg-emerald-500 text-white" : "bg-white text-slate-500 border border-slate-200")}>{s}</button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">비고</label>
                            <input type="text" placeholder="특이사항" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none" value={currentAsset.remarks} onChange={(e) => setCurrentAsset({...currentAsset, remarks: e.target.value})} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer">
                            <Camera className="w-4 h-4" />
                            사진 등록
                            <input type="file" className="hidden" accept="image/*" multiple />
                          </label>
                          <button onClick={addAsset} className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">목록에 추가</button>
                        </div>
                      </div>

                      {/* 등록된 자산 목록 (하단 테이블) */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900">등록된 자산 목록 ({formData.assets.length})</h4>
                          {formData.assets.length > 0 && (
                            <button onClick={() => setFormData({...formData, assets: []})} className="text-xs font-bold text-red-500 hover:underline">전체 삭제</button>
                          )}
                        </div>
                        {formData.assets.length === 0 ? (
                          <div className="min-h-[120px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                            <Monitor className="w-10 h-10 mb-2 opacity-20" />
                            <p className="text-sm font-medium">등록된 자산이 없습니다.</p>
                            <p className="text-xs mt-1">위 폼에서 자산을 추가해 주세요.</p>
                          </div>
                        ) : (
                          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                  <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-500">유형</th>
                                  <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-500">제조사</th>
                                  <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-500">모델명</th>
                                  <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-500">수량</th>
                                  <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-500">상태</th>
                                  <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-500">비고</th>
                                  <th className="px-4 py-2.5"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {formData.assets.map((asset) => (
                                  <tr key={asset.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold">{asset.type}</span></td>
                                    <td className="px-4 py-2.5 text-slate-700">{asset.manufacturer}</td>
                                    <td className="px-4 py-2.5 font-bold text-slate-900">{asset.model}</td>
                                    <td className="px-4 py-2.5 text-slate-700">{asset.quantity}대</td>
                                    <td className="px-4 py-2.5 text-slate-500">{asset.condition}</td>
                                    <td className="px-4 py-2.5 text-slate-400 text-xs">{asset.remarks || '-'}</td>
                                    <td className="px-4 py-2.5"><button onClick={() => removeAsset(asset.id)} className="text-slate-300 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">STEP 3. 데이터 삭제 요청</h3>
                      <p className="text-slate-500 text-sm mt-1">저장매체 내 데이터 파기 수준 및 인증서 발급 여부를 선택해 주세요.</p>
                    </div>
                    <div className="max-w-2xl space-y-8">
                      <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                        <div>
                          <p className="font-bold text-slate-900">데이터 삭제 필요 여부</p>
                          <p className="text-xs text-slate-500 mt-1">전문 솔루션을 통한 데이터 완전 파기 진행 여부</p>
                        </div>
                        <button 
                          onClick={() => setFormData({...formData, dataDeletion: !formData.dataDeletion})}
                          className={cn(
                            "w-14 h-7 rounded-full relative transition-all duration-300",
                            formData.dataDeletion ? "bg-emerald-500" : "bg-slate-300"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300",
                            formData.dataDeletion ? "left-8" : "left-1"
                          )}></div>
                        </button>
                      </div>

                      <AnimatePresence>
                        {formData.dataDeletion && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-8 overflow-hidden"
                          >
                            <div className="space-y-4">
                              <label className="text-sm font-bold text-slate-700">삭제 등급</label>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                  { id: '일반삭제', desc: '단순 포맷 및 덮어쓰기' },
                                  { id: '보안삭제(NIST 800-88)', desc: '글로벌 보안 표준 준수 파기' },
                                  { id: '물리파괴', desc: '천공 또는 파쇄 처리' }
                                ].map(g => (
                                  <button 
                                    key={g.id}
                                    onClick={() => setFormData({...formData, deletionGrade: g.id})}
                                    className={cn(
                                      "p-4 rounded-xl border-2 text-left transition-all",
                                      formData.deletionGrade === g.id ? "border-emerald-500 bg-emerald-50" : "border-slate-100 bg-white hover:border-slate-200"
                                    )}
                                  >
                                    <p className={cn("text-sm font-bold", formData.deletionGrade === g.id ? "text-emerald-700" : "text-slate-900")}>{g.id}</p>
                                    <p className="text-[10px] text-slate-500 mt-1">{g.desc}</p>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                              <input 
                                type="checkbox" 
                                id="cert"
                                checked={formData.issueCertificate}
                                onChange={(e) => setFormData({...formData, issueCertificate: e.target.checked})}
                                className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label htmlFor="cert" className="text-sm font-bold text-blue-900 cursor-pointer">
                                데이터 파기 인증서(CoD) 발급 요청 <span className="text-xs font-normal opacity-70 ml-1">Certificate of Destruction</span>
                              </label>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">보안 요구사항 (선택)</label>
                        <textarea 
                          placeholder="사내 보안 정책 등 추가 요청사항이 있다면 기재해 주세요."
                          className="w-full h-32 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none"
                          value={formData.securityRequirements}
                          onChange={(e) => setFormData({...formData, securityRequirements: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">STEP 4. 수거 정보</h3>
                      <p className="text-slate-500 text-sm mt-1">자산 수거를 위한 장소와 일정을 입력해 주세요.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">수거 희망일</label>
                          <input 
                            type="date" 
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            value={formData.collectionDate}
                            onChange={(e) => setFormData({...formData, collectionDate: e.target.value})}
                          />
                          <p className="text-[10px] text-slate-400">* 신청일 기준 최소 3영업일 이후부터 선택 가능합니다.</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">수거 희망 시간대</label>
                          <select 
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            value={formData.collectionTime}
                            onChange={(e) => setFormData({...formData, collectionTime: e.target.value})}
                          >
                            <option>오전(9-12)</option>
                            <option>오후(13-18)</option>
                            <option>협의</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">수거지 주소</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="주소 검색" 
                              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                              value={formData.address}
                              readOnly
                            />
                            <button 
                              onClick={() => setFormData({...formData, address: '서울특별시 강남구 테헤란로 521'})}
                              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                            >
                              검색
                            </button>
                          </div>
                          <input 
                            type="text" 
                            placeholder="상세 주소를 입력하세요" 
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            value={formData.addressDetail}
                            onChange={(e) => setFormData({...formData, addressDetail: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">수거지 층수/위치</label>
                          <input 
                            type="text" 
                            placeholder="예: B2 전산실, 3층 창고 등"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            value={formData.floorLocation}
                            onChange={(e) => setFormData({...formData, floorLocation: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">엘리베이터 / 화물용</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['사용가능', '불가', '화물전용 있음'].map(v => (
                              <button 
                                key={v}
                                onClick={() => setFormData({...formData, elevator: v})}
                                className={cn(
                                  "py-3 rounded-xl border-2 text-xs font-bold transition-all",
                                  formData.elevator === v ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-100 text-slate-500"
                                )}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">현장 담당자 (신청자와 다를 경우)</label>
                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              placeholder="담당자명"
                              className="px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                              value={formData.onSiteContact}
                              onChange={(e) => setFormData({...formData, onSiteContact: e.target.value})}
                            />
                            <input 
                              type="tel" 
                              placeholder="연락처"
                              className="px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                              value={formData.onSitePhone}
                              onChange={(e) => setFormData({...formData, onSitePhone: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-8">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">STEP 5. 예상금액</h3>
                      <p className="text-slate-500 text-sm mt-1">배출 자산의 예상 정산 금액을 확인하세요.</p>
                    </div>
                    <div className="max-w-3xl space-y-6">
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="divide-y divide-slate-100">
                          <div className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><span className="text-emerald-600 font-black text-xs">+</span></div>
                              <div><p className="font-bold text-slate-900">배출자산가치</p><p className="text-xs text-slate-400">자산 {formData.assets.length}건 기준</p></div>
                            </div>
                            <p className="text-lg font-black text-emerald-600">+{(formData.assets.length * 125000).toLocaleString()}원</p>
                          </div>
                          <div className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center"><span className="text-rose-600 font-black text-xs">-</span></div>
                              <div><p className="font-bold text-slate-900">보안운송비</p><p className="text-xs text-slate-400">거리/수량 기반 산정</p></div>
                            </div>
                            <p className="text-lg font-black text-rose-600">-{(formData.assets.length * 15000).toLocaleString()}원</p>
                          </div>
                          <div className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center"><span className="text-rose-600 font-black text-xs">-</span></div>
                              <div><p className="font-bold text-slate-900">데이터삭제</p><p className="text-xs text-slate-400">{formData.dataDeletion ? formData.deletionGrade : '미요청'}</p></div>
                            </div>
                            <p className="text-lg font-black text-rose-600">-{formData.dataDeletion ? (formData.assets.length * 30000).toLocaleString() : '0'}원</p>
                          </div>
                          <div className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center"><span className="text-rose-600 font-black text-xs">-</span></div>
                              <div><p className="font-bold text-slate-900">최종처리비</p><p className="text-xs text-slate-400">분해/분류/폐기 비용</p></div>
                            </div>
                            <p className="text-lg font-black text-rose-600">-{(formData.assets.length * 20000).toLocaleString()}원</p>
                          </div>
                        </div>
                        <div className="bg-indigo-50 border-t-2 border-indigo-200 p-6 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-indigo-900 text-lg">정산금액 예상</p>
                            <p className="text-xs text-indigo-500 mt-1">실제 금액은 검수 후 확정됩니다</p>
                          </div>
                          <p className="text-2xl font-black text-indigo-600">
                            {((formData.assets.length * 125000) - (formData.assets.length * 15000) - (formData.dataDeletion ? formData.assets.length * 30000 : 0) - (formData.assets.length * 20000)).toLocaleString()}원
                          </p>
                        </div>
                      </div>

                      <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Leaf className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900">ESG 리포트 발급</p>
                            <p className="text-xs text-emerald-700 mt-1">탄소절감 및 자원순환 실적 리포트를 제공합니다.</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.esgReport}
                          onChange={(e) => setFormData({...formData, esgReport: e.target.checked})}
                          className="w-6 h-6 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-8">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">STEP 6. 확인 및 제출</h3>
                      <p className="text-slate-500 text-sm mt-1">입력하신 내용을 최종 확인하고 신청서를 제출해 주세요.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                          <h4 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                            <ClipboardList className="w-4 h-4" />
                            신청 요약
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-500">신청자</span>
                              <span className="font-bold text-slate-900">{formData.applicantName} ({formData.department})</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">배출 자산</span>
                              <span className="font-bold text-slate-900">{formData.assets.length}건</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">데이터 삭제</span>
                              <span className="font-bold text-slate-900">{formData.dataDeletion ? `요청 (${formData.deletionGrade})` : "미요청"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">수거 일정</span>
                              <span className="font-bold text-slate-900">{formData.collectionDate} {formData.collectionTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">수거지</span>
                              <span className="font-bold text-slate-900 text-right">{formData.address} {formData.addressDetail}</span>
                            </div>
                            <div className="flex justify-between pt-3 mt-3 border-t border-slate-200">
                              <span className="text-indigo-600 font-bold">예상 정산금액</span>
                              <span className="font-black text-indigo-600 text-lg">
                                {((formData.assets.length * 125000) - (formData.assets.length * 15000) - (formData.dataDeletion ? formData.assets.length * 30000 : 0) - (formData.assets.length * 20000)).toLocaleString()}원
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                            <input 
                              type="checkbox" 
                              id="terms1" 
                              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" 
                              checked={formData.agreedTerms}
                              onChange={(e) => setFormData({...formData, agreedTerms: e.target.checked})}
                            />
                            <label htmlFor="terms1" className="text-sm font-bold text-slate-700 cursor-pointer">서비스 이용약관 및 개인정보 처리방침 동의 (필수)</label>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                            <input 
                              type="checkbox" 
                              id="terms2" 
                              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" 
                              checked={formData.agreedSecurity}
                              onChange={(e) => setFormData({...formData, agreedSecurity: e.target.checked})}
                            />
                            <label htmlFor="terms2" className="text-sm font-bold text-slate-700 cursor-pointer">보안 서약 동의: 자산 내 데이터에 대한 책임 고지 (필수)</label>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-bold mb-4">최종 제출 전 안내</h4>
                          <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex gap-3">
                              <div className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                              </div>
                              신청 완료 후 담당자가 24시간 이내에 연락을 드립니다.
                            </li>
                            <li className="flex gap-3">
                              <div className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                              </div>
                              수거 전 자산의 외관 사진을 미리 등록하시면 정확한 견적 산출이 가능합니다.
                            </li>
                            <li className="flex gap-3">
                              <div className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                              </div>
                              데이터 삭제 요청 시, 작업 완료 후 인증서가 자동 발급됩니다.
                            </li>
                          </ul>
                        </div>
                        <button 
                          onClick={() => {
                            if (!formData.agreedTerms || !formData.agreedSecurity) {
                              alert('필수 약관에 동의해 주세요.');
                              return;
                            }
                            alert('배출 신청이 정상적으로 접수되었습니다.');
                            setEmissionTab('list');
                            setCurrentStep(1);
                            setFormData({
                              companyName: 'K-ITAD 전자 (로그인 연동)',
                              applicantName: '',
                              department: '',
                              contact: '',
                              email: '',
                              assets: [],
                              dataDeletion: false,
                              deletionGrade: '보안삭제(NIST 800-88)',
                              issueCertificate: true,
                              securityRequirements: '',
                              collectionDate: '',
                              collectionTime: '오전(9-12)',
                              address: '',
                              addressDetail: '',
                              floorLocation: '',
                              elevator: '가능',
                              onSiteContact: '',
                              onSitePhone: '',
                              processingMethods: [],
                              settlementPreference: '정산 받겠음',
                              esgReport: true,
                              agreedTerms: false,
                              agreedSecurity: false,
                            });
                          }}
                          className={cn(
                            "w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all mt-8",
                            formData.agreedTerms && formData.agreedSecurity 
                              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20" 
                              : "bg-slate-700 text-slate-500 cursor-not-allowed"
                          )}
                        >
                          배출신청 제출하기
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <button 
                  onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className={cn(
                    "px-8 py-3 font-bold rounded-xl transition-all",
                    currentStep === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:bg-white hover:shadow-sm"
                  )}
                >
                  이전 단계
                </button>
                <div className="flex gap-4">
                  <button className="px-8 py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors">임시 저장</button>
                  {currentStep < 6 && (
                    <button 
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-10 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
                    >
                      다음 단계로
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
              </div>
            </div>
            </div>
            )}
          </motion.div>
        );
      case 'transport': {
        const currentTransportData = transportMonitorData.transports.find(t => t.id === selectedTransport);
        const integrityData = selectedTransport ? getIntegrityByType(selectedTransport) : null;

        const totalAssets = currentTransportData?.assetCount ?? 0;
        const matchedAssets = currentTransportData?.matchedCount ?? 0;
        const integrityRate = totalAssets > 0 ? Math.round((matchedAssets / totalAssets) * 100) : 0;
        const transportStatus = currentTransportData?.status ?? '—';

        const filteredDispatch = dispatchableEmissions.filter(e => {
          if (dispatchFilter === '전체') return true;
          if (dispatchFilter === '배차대기') return getDispatchStatus(e.id) === '배차대기';
          if (dispatchFilter === '배차완료') return getDispatchStatus(e.id) === '배차완료';
          return true;
        });

        const filteredIntegrityAssets = integrityData
          ? integrityData.scannedAssets.filter(a => {
              const matchFilter = integrityFilter === '전체' || a.status === integrityFilter;
              const matchSearch =
                integritySearch === '' ||
                a.sn.toLowerCase().includes(integritySearch.toLowerCase()) ||
                a.model.toLowerCase().includes(integritySearch.toLowerCase()) ||
                a.manufacturer.toLowerCase().includes(integritySearch.toLowerCase());
              return matchFilter && matchSearch;
            })
          : [];

        const selectedDispatchEmission = dispatchableEmissions.find(e => e.id === selectedDispatch);
        const selectedDispatchStatus = selectedDispatch ? getDispatchStatus(selectedDispatch) : null;

        // Calendar driver data
        const calendarDrivers = [
          { name: '박운송', vehicle: '서울12가3456', phone: '010-1111-2222', license: '1종 대형', licenseNo: '11-23-456789-01', vehicleType: '5톤 윙바디', vehicleYear: '2023', insurance: '삼성화재 (영업배상 5억)', photo: '' },
          { name: '김기사', vehicle: '경기34나7890', phone: '010-3333-4444', license: '1종 대형', licenseNo: '22-34-567890-02', vehicleType: '3.5톤 탑차', vehicleYear: '2024', insurance: '현대해상 (영업배상 5억)', photo: '' },
          { name: '이운전', vehicle: '서울56다1234', phone: '010-5555-6666', license: '1종 보통', licenseNo: '33-45-678901-03', vehicleType: '1톤 탑차', vehicleYear: '2022', insurance: 'DB손해보험 (영업배상 3억)', photo: '' },
        ];

        // Generate Mon-Fri of current week with offset
        const getWeekDates = (offset: number) => {
          const now = new Date();
          const dayOfWeek = now.getDay();
          const monday = new Date(now);
          monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset * 7);
          const dates: { date: Date; label: string; key: string }[] = [];
          const dayNames = ['월', '화', '수', '목', '금'];
          for (let i = 0; i < 5; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            dates.push({
              date: d,
              label: `${dayNames[i]} ${d.getMonth() + 1}/${d.getDate()}`,
              key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
            });
          }
          return dates;
        };
        const weekDates = getWeekDates(calendarWeekOffset);

        // Unassigned dispatch requests (배차대기 only)
        const unassignedRequests = dispatchableEmissions.filter(e => {
          const dStatus = getDispatchStatus(e.id);
          if (dStatus === '배차완료') return false;
          const isAssigned = Object.values(calendarAssignments).some((a: { requestId: string }) => a.requestId === e.id);
          return !isAssigned;
        });

        // Role-based tab configuration
        const getTransportTabs = () => {
          switch (userRole) {
            case 'emitter':
              return [];
            case 'transporter':
              return [
                { id: 'dispatch' as const, label: '배차 관리', icon: ClipboardList },
                { id: 'monitoring' as const, label: '운송 모니터링', icon: Monitor },
              ];
            case 'processor':
              return [
                { id: 'monitoring' as const, label: '운송 모니터링', icon: Monitor },
              ];
            case 'government':
              return [
                { id: 'dispatch' as const, label: '배차 관리', icon: ClipboardList },
                { id: 'info' as const, label: '운송 정보', icon: FileText },
                { id: 'monitoring' as const, label: '운송 모니터링', icon: Monitor },
              ];
            case 'admin':
              return [
                { id: 'dispatch' as const, label: '배차 관리', icon: ClipboardList },
                { id: 'monitoring' as const, label: '운송 모니터링', icon: Monitor },
              ];
            default:
              return [
                { id: 'dispatch' as const, label: '배차 관리', icon: ClipboardList },
                { id: 'monitoring' as const, label: '운송 모니터링', icon: Monitor },
              ];
          }
        };
        const transportTabs = getTransportTabs();

        // Role-based title and description
        const getTransportTitle = () => {
          switch (userRole) {
            case 'emitter': return { title: '운송 모니터링', desc: '배출 요청 건의 운송 상태를 실시간으로 확인합니다.' };
            case 'transporter': return { title: '운송 관리', desc: '배차 관리 및 운송 모니터링을 수행합니다.' };
            case 'processor': return { title: '운송 현황', desc: '배차 현황 조회 및 운송 모니터링을 확인합니다.' };
            case 'admin': return { title: '운송 통합 관리', desc: '전체 운송 현황을 조회합니다.' };
            default: return { title: '운송 관리', desc: '배차 관리 및 운송 모니터링을 수행합니다.' };
          }
        };
        const transportTitle = getTransportTitle();

        const isReadOnlyDispatch = userRole === 'processor' || userRole === 'admin' || userRole === 'government';

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 pb-20"
          >
            {/* Page Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <Truck className="w-8 h-8 text-indigo-600" />
                  {transportTitle.title}
                </h1>
                <p className="text-slate-500 mt-1">{transportTitle.desc}</p>
              </div>
              {isReadOnlyDispatch && transportTab === 'dispatch' && (
                <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  읽기 전용
                </span>
              )}
            </div>

            {/* Tabs */}
            {transportTabs.length > 0 && (
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit flex-wrap">
                {transportTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTransportTab(tab.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold transition-all',
                      transportTab === tab.id
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* =================== 배출자 전용: 차량 목록 + 지도 통합 뷰 =================== */}
            {userRole === 'emitter' && (
              <div className="flex gap-0 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white" style={{ height: 'calc(100vh - 220px)', minHeight: 500 }}>
                {/* 좌측: 배출요청건 목록 */}
                <div className="w-[320px] border-r border-slate-200 flex flex-col flex-shrink-0">
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-slate-900">배출요청건 ({transportMonitorData.transports.length})</p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span><span className="font-bold text-blue-600">운송중 {transportMonitorData.transports.filter(t => t.status === '운송중').length}</span></span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span><span className="font-bold text-emerald-600">완료 {transportMonitorData.transports.filter(t => t.status === '완료').length}</span></span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-300 rounded-full"></span><span className="font-bold text-slate-400">대기 {transportMonitorData.transports.filter(t => t.status !== '운송중' && t.status !== '완료').length}</span></span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {transportMonitorData.transports.map(t => (
                      <div
                        key={t.id}
                        className={cn(
                          "px-4 py-3.5 border-b border-slate-100 cursor-pointer transition-all",
                          selectedTransport === t.id ? "bg-indigo-50 border-l-4 border-l-indigo-500" : "hover:bg-slate-50 border-l-4 border-l-transparent"
                        )}
                      >
                        <div onClick={() => setSelectedTransport(t.id)}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-slate-900">{t.emissionId || t.id}</span>
                            <span className={cn(
                              'px-2 py-0.5 rounded-md text-[10px] font-bold',
                              t.status === '운송중' ? 'bg-blue-100 text-blue-700' :
                              t.status === '완료' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                            )}>{t.status}</span>
                          </div>
                          <p className="text-xs text-slate-600">{t.company}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <p className="text-[10px] text-slate-400">{t.vehicle} · {t.driver} · {t.assetCount}대</p>
                            <button
                              onClick={(e) => { e.stopPropagation(); setTransportDetailModal(t.id); }}
                              className="text-[10px] text-indigo-600 font-bold hover:underline"
                            >
                              상세보기
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 우측: Leaflet 실제 지도 */}
                <div className="flex-1 relative">
                  <div
                    id="emitter-transport-map"
                    className="w-full h-full"
                    style={{ zIndex: 0 }}
                    ref={(el) => {
                      if (!el || (el as any).__leaflet_map) return;
                      const L = (window as any).L;
                      if (!L) return;
                      const map = L.map(el, { zoomControl: false }).setView([37.35, 127.1], 10);
                      L.control.zoom({ position: 'bottomright' }).addTo(map);
                      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap',
                        maxZoom: 18,
                      }).addTo(map);

                      // 출발지 (서울 강남구)
                      const startLatLng: [number, number] = [37.5087, 127.0632];
                      // 도착지 (경기 용인시 ITAD센터)
                      const endLatLng: [number, number] = [37.2411, 127.1775];

                      const createIcon = (color: string, label: string) =>
                        L.divIcon({
                          className: '',
                          html: `<div style="width:28px;height:28px;background:${color};border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:10px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${label}</div>`,
                          iconSize: [28, 28],
                          iconAnchor: [14, 14],
                        });

                      L.marker(startLatLng, { icon: createIcon('#10b981', 'S') }).addTo(map).bindPopup('<b>출발지</b><br>서울 강남구 테헤란로 521');
                      L.marker(endLatLng, { icon: createIcon('#ef4444', 'E') }).addTo(map).bindPopup('<b>ITAD 처리센터</b><br>경기 용인시 처인구');

                      // 경로선
                      const routePoints: [number, number][] = [
                        startLatLng, [37.48, 127.08], [37.44, 127.10], [37.40, 127.12],
                        [37.36, 127.14], [37.32, 127.16], [37.28, 127.17], endLatLng,
                      ];
                      // 경로 외곽선 (두꺼운 어두운 선)
                      L.polyline(routePoints, { color: '#1e293b', weight: 7, opacity: 0.3, lineCap: 'round', lineJoin: 'round' }).addTo(map);
                      // 경로 메인선 (밝은 파란색)
                      L.polyline(routePoints, { color: '#4f46e5', weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(map);

                      // 차량 마커들
                      const vehiclePositions: [number, number][] = [
                        [37.45, 127.09], [37.40, 127.11], [37.36, 127.13], [37.48, 127.07], [37.30, 127.16],
                      ];
                      const statusColors: Record<string, string> = { '운송중': '#3b82f6', '완료': '#10b981' };
                      transportMonitorData.transports.forEach((t: any, i: number) => {
                        const pos = vehiclePositions[i % vehiclePositions.length];
                        const color = statusColors[t.status] || '#94a3b8';
                        const marker = L.marker(pos, {
                          icon: createIcon(color, String(i + 1)),
                        }).addTo(map);
                        marker.bindPopup(`<b>${t.emissionId || t.id}</b><br>${t.company}<br>${t.vehicle} · ${t.driver}<br>상태: ${t.status}`);
                        marker.on('click', () => setSelectedTransport(t.id));
                      });

                      (el as any).__leaflet_map = map;
                      setTimeout(() => map.invalidateSize(), 200);
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* 배출자: 알림 로그 */}
            {userRole === 'emitter' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-600" />
                    운송 알림
                  </h3>
                  <span className="text-[10px] text-slate-400">최근 24시간</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-[200px] overflow-y-auto">
                  {[
                    { time: '14:32', type: '경로이탈', msg: 'DSP-2026-00123: 설정 경로에서 1.2km 이탈 감지', level: 'danger' },
                    { time: '13:15', type: '상차완료', msg: 'DSP-2026-00124: K-ITAD 전자 상차 완료, 운송 시작', level: 'info' },
                    { time: '11:40', type: '배차확정', msg: 'DSP-2026-00125: 박운송 기사 배정 완료 (서울12가3456)', level: 'info' },
                    { time: '10:05', type: '도착완료', msg: 'DSP-2026-00122: ITAD 처리센터 도착, 하차 대기중', level: 'success' },
                    { time: '09:30', type: '운송지연', msg: 'DSP-2026-00121: 예상 도착시간 대비 25분 지연', level: 'warning' },
                    { time: '08:50', type: '인수완료', msg: 'DSP-2026-00120: 하차 인수인계 완료, 봉인 정상', level: 'success' },
                  ].map((n, i) => (
                    <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                      <span className="text-[10px] text-slate-400 font-mono w-10 flex-shrink-0 pt-0.5">{n.time}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] font-bold flex-shrink-0",
                        n.level === 'danger' ? "bg-rose-100 text-rose-700" :
                        n.level === 'warning' ? "bg-amber-100 text-amber-700" :
                        n.level === 'success' ? "bg-emerald-100 text-emerald-700" :
                        "bg-blue-100 text-blue-700"
                      )}>{n.type}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 배출자 상세정보 모달 */}
            {userRole === 'emitter' && transportDetailModal && (() => {
              const detail = transportMonitorData.transports.find(t => t.id === transportDetailModal);
              if (!detail) return null;
              return (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center" style={{ zIndex: 9999 }} onClick={() => setTransportDetailModal(null)}>
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-slate-900">운송 상세정보</h3>
                      <button onClick={() => setTransportDetailModal(null)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200"><X className="w-4 h-4 text-slate-500" /></button>
                    </div>
                    <div className="space-y-0">
                      {[
                        { label: '배출신청번호', value: detail.emissionId || detail.id },
                        { label: '운송회사', value: detail.company },
                        { label: '운전자', value: detail.driver },
                        { label: '차량번호', value: detail.vehicle },
                        { label: '자산수', value: `${detail.assetCount}대` },
                        { label: '운송상태', value: detail.status },
                        { label: '출발지', value: detail.from || '서울 강남구 테헤란로' },
                        { label: '도착지', value: detail.to || '경기 용인시 ITAD센터' },
                        { label: '봉인번호', value: detail.sealNumber, mono: true },
                        { label: '봉인상태', value: detail.sealStatus || '정상' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                          <span className="text-sm text-slate-500">{row.label}</span>
                          <span className={cn("text-sm font-bold text-slate-900", row.mono && "font-mono text-purple-700")}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* =================== TAB: 배차 관리 (CALENDAR for transporter, read-only table for processor/admin) =================== */}
            {transportTab === 'dispatch' && userRole !== 'emitter' && (
              <div className="space-y-6">
                {userRole === 'transporter' ? (
                  /* ===== TRANSPORTER: Calendar Drag & Drop ===== */
                  <>
                  <div className="flex gap-4" style={{ minHeight: 520 }}>
                    {/* LEFT PANEL: Request list (25%) */}
                    <div className="w-[25%] min-w-[240px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-slate-100">
                        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <ClipboardList className="w-4 h-4 text-indigo-600" />
                          배차 요청건
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">아래 건을 캘린더에 드래그하여 배차하세요</p>
                        <div className="flex bg-slate-100 p-1 rounded-xl mt-3">
                          {['전체', '배차대기', '배차완료'].map(f => (
                            <button
                              key={f}
                              onClick={() => setDispatchFilter(f)}
                              className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-1',
                                dispatchFilter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                              )}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {filteredDispatch.map(e => {
                          const dStatus = getDispatchStatus(e.id);
                          const isAssigned = Object.values(calendarAssignments).some((a: { requestId: string }) => a.requestId === e.id);
                          const isDraggable = dStatus === '배차대기' && !isAssigned;
                          return (
                            <div
                              key={e.id}
                              draggable={isDraggable}
                              onDragStart={(ev) => {
                                if (!isDraggable) return;
                                setDraggedRequest(e.id);
                                ev.dataTransfer.effectAllowed = 'move';
                                ev.dataTransfer.setData('text/plain', e.id);
                              }}
                              onDragEnd={() => setDraggedRequest(null)}
                              className={cn(
                                'p-3 rounded-xl border transition-all',
                                isDraggable
                                  ? 'border-indigo-200 bg-indigo-50/50 cursor-grab hover:shadow-md hover:border-indigo-300 active:cursor-grabbing'
                                  : isAssigned
                                    ? 'border-emerald-200 bg-emerald-50/50'
                                    : dStatus === '배차완료'
                                      ? 'border-slate-200 bg-slate-50/50'
                                      : 'border-slate-200 bg-white',
                                draggedRequest === e.id ? 'opacity-50 scale-95' : ''
                              )}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-indigo-700">{e.id}</span>
                                <span className={cn(
                                  'px-2 py-0.5 rounded-md text-[10px] font-bold',
                                  isAssigned ? 'bg-emerald-100 text-emerald-700' :
                                  dStatus === '배차완료' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                )}>
                                  {isAssigned ? '배정완료' : dStatus}
                                </span>
                              </div>
                              <p className="text-sm font-bold text-slate-900 truncate">{e.company}</p>
                              <p className="text-xs text-slate-500 truncate">{e.assetSummary}</p>
                              <div className="flex items-center justify-between mt-1.5">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <Clock className="w-3 h-3" />
                                  <span>{e.collectionDate}</span>
                                  <span className="text-slate-300">|</span>
                                  <span>{e.assetCount}대</span>
                                </div>
                                <button
                                  onClick={(ev) => { ev.stopPropagation(); setDispatchDetailModal(e.id); }}
                                  className="text-[10px] text-indigo-600 font-bold hover:underline"
                                >
                                  상세보기
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {filteredDispatch.length === 0 && (
                          <div className="py-8 text-center text-slate-400 text-sm">
                            해당 조건의 요청이 없습니다.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT PANEL: Weekly Calendar (75%) */}
                    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <ClipboardList className="w-4 h-4 text-indigo-600" />
                          주간 배차 캘린더
                        </h2>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setCalendarWeekOffset(calendarWeekOffset - 1)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4 text-slate-500" />
                            </button>
                            <button
                              onClick={() => setCalendarWeekOffset(0)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                            >
                              {weekDates.length > 0 ? `${weekDates[0].date.getMonth() + 1}/${weekDates[0].date.getDate()} ~ ${weekDates[weekDates.length - 1].date.getMonth() + 1}/${weekDates[weekDates.length - 1].date.getDate()}${calendarWeekOffset === 0 ? ' (이번 주)' : calendarWeekOffset === 1 ? ' (다음 주)' : calendarWeekOffset === -1 ? ' (지난 주)' : ''}` : '이번 주'}
                            </button>
                            <button
                              onClick={() => setCalendarWeekOffset(calendarWeekOffset + 1)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            </button>
                          </div>
                          {Object.keys(calendarAssignments).length > 0 && (
                            <button
                              onClick={() => {
                                alert(`${Object.keys(calendarAssignments).length}건 배차가 확정되었습니다.`);
                              }}
                              className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5" />
                              저장
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="sticky left-0 z-10 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-500 text-left border-b border-r border-slate-200 w-[140px]">
                                기사 / 차량
                              </th>
                              {weekDates.map(d => (
                                <th key={d.key} className="px-2 py-2.5 text-xs font-bold text-slate-500 text-center border-b border-slate-200 min-w-[110px]">
                                  {d.label}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {calendarDrivers.map(driver => (
                              <tr key={driver.name}>
                                <td className="sticky left-0 z-10 bg-white px-3 py-5 border-b border-r border-slate-100">
                                  <button
                                    onClick={() => setDriverDetailModal(driver.name)}
                                    className="text-left hover:bg-indigo-50 rounded-lg px-2 py-1 -mx-2 -my-1 transition-colors"
                                  >
                                    <p className="text-sm font-bold text-indigo-600 hover:underline">{driver.name}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">{driver.vehicle}</p>
                                  </button>
                                </td>
                                {weekDates.map(d => {
                                  const cellKey = `${driver.name}__${d.key}`;
                                  const assignment = calendarAssignments[cellKey];
                                  return (
                                    <td
                                      key={d.key}
                                      className={cn(
                                        'px-1.5 py-2.5 border-b border-slate-100 text-center align-top transition-colors min-h-[72px]',
                                        !assignment ? 'hover:bg-indigo-50/30' : ''
                                      )}
                                      onDragOver={(ev) => {
                                        if (!assignment) {
                                          ev.preventDefault();
                                          ev.currentTarget.classList.add('bg-indigo-100/50');
                                        }
                                      }}
                                      onDragLeave={(ev) => {
                                        ev.currentTarget.classList.remove('bg-indigo-100/50');
                                      }}
                                      onDrop={(ev) => {
                                        ev.preventDefault();
                                        ev.currentTarget.classList.remove('bg-indigo-100/50');
                                        const reqId = ev.dataTransfer.getData('text/plain');
                                        if (!reqId || assignment) return;
                                        const emission = dispatchableEmissions.find(e => e.id === reqId);
                                        if (!emission) return;
                                        setCalendarAssignments(prev => ({
                                          ...prev,
                                          [cellKey]: {
                                            requestId: reqId,
                                            company: emission.company,
                                            assetSummary: emission.assetSummary,
                                          },
                                        }));
                                        setDraggedRequest(null);
                                      }}
                                    >
                                      {assignment ? (
                                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2 text-left relative group">
                                          <button
                                            onClick={() => {
                                              setCalendarAssignments(prev => {
                                                const next = { ...prev };
                                                delete next[cellKey];
                                                return next;
                                              });
                                            }}
                                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            ×
                                          </button>
                                          <p className="text-[10px] font-bold text-indigo-700 truncate">{assignment.requestId}</p>
                                          <p className="text-[10px] text-slate-500 truncate">{assignment.company}</p>
                                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{assignment.assetSummary}</p>
                                        </div>
                                      ) : (
                                        <div className="h-[84px] rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center">
                                          <span className="text-[10px] text-slate-300">드롭</span>
                                        </div>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Calendar summary */}
                      <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-slate-500">
                            배정: <strong className="text-indigo-700">{Object.keys(calendarAssignments).length}건</strong>
                          </span>
                          <span className="text-slate-500">
                            미배정: <strong className="text-amber-600">{unassignedRequests.length}건</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 배차요청 상세정보 모달 */}
                  {dispatchDetailModal && (() => {
                    const detail = dispatchableEmissions.find(e => e.id === dispatchDetailModal);
                    if (!detail) return null;
                    // Mock 물품정보
                    const itemDetails = [
                      { type: '서버', model: 'Dell PowerEdge R740', qty: 2, width: '48cm', height: '17cm', note: '랙마운트형' },
                      { type: '노트북', model: 'Dell Latitude 5520', qty: 4, width: '34cm', height: '24cm', note: '' },
                      { type: '데스크탑', model: 'HP EliteDesk 800', qty: (detail.assetCount - 6 > 0 ? detail.assetCount - 6 : 2), width: '17cm', height: '34cm', note: '모니터 별도' },
                    ];
                    return (
                      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDispatchDetailModal(null)}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
                          onClick={e => e.stopPropagation()}
                        >
                          {/* 헤더 */}
                          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-indigo-600" />
                                배차요청 상세정보
                              </h3>
                              <p className="text-sm text-slate-500 mt-1">신청번호: <span className="font-bold text-indigo-600">{detail.id}</span></p>
                            </div>
                            <button onClick={() => setDispatchDetailModal(null)} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                              <X className="w-4 h-4 text-slate-500" />
                            </button>
                          </div>

                          <div className="overflow-y-auto max-h-[calc(85vh-140px)]">
                            {/* 기본 정보 */}
                            <div className="p-6 space-y-3 border-b border-slate-100">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500" /> 수거/폐기 정보</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { label: '요청일', value: detail.createdAt.split(' ')[0] },
                                  { label: '수거 희망일', value: detail.collectionDate },
                                  { label: '신청업체', value: detail.company },
                                  { label: '담당자', value: `${detail.applicant} (${detail.department})` },
                                  { label: '연락처', value: detail.contact },
                                  { label: '처리방식', value: detail.processing },
                                ].map((row, i) => (
                                  <div key={i} className="flex flex-col">
                                    <span className="text-[11px] text-slate-400 font-bold">{row.label}</span>
                                    <span className="text-sm font-bold text-slate-900">{row.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 상차지/하차지 */}
                            <div className="p-6 space-y-3 border-b border-slate-100">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-500" /> 상차지 / 하차지</h4>
                              <div className="grid grid-cols-1 gap-3">
                                <div className="bg-blue-50 rounded-xl p-3">
                                  <span className="text-[11px] font-bold text-blue-500">상차지 (수거)</span>
                                  <p className="text-sm font-bold text-slate-900 mt-0.5">{detail.address}</p>
                                </div>
                                <div className="bg-emerald-50 rounded-xl p-3">
                                  <span className="text-[11px] font-bold text-emerald-500">하차지 (센터)</span>
                                  <p className="text-sm font-bold text-slate-900 mt-0.5">경기 용인시 처인구 ITAD 처리센터</p>
                                </div>
                              </div>
                            </div>

                            {/* 물품정보 */}
                            <div className="p-6 space-y-3 border-b border-slate-100">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2"><Package className="w-4 h-4 text-indigo-500" /> 물품정보</h4>
                              <p className="text-xs text-slate-500">총 {detail.assetCount}대 · {detail.totalWeight}</p>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                  <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                      <th className="px-3 py-2 text-[11px] font-bold text-slate-500">분류</th>
                                      <th className="px-3 py-2 text-[11px] font-bold text-slate-500">모델명</th>
                                      <th className="px-3 py-2 text-[11px] font-bold text-slate-500">수량</th>
                                      <th className="px-3 py-2 text-[11px] font-bold text-slate-500">부피 (가로×세로)</th>
                                      <th className="px-3 py-2 text-[11px] font-bold text-slate-500">비고</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    {itemDetails.map((item, i) => (
                                      <tr key={i} className="hover:bg-slate-50">
                                        <td className="px-3 py-2 text-sm font-bold text-slate-900">{item.type}</td>
                                        <td className="px-3 py-2 text-sm text-slate-700">{item.model}</td>
                                        <td className="px-3 py-2 text-sm font-bold text-indigo-600">{item.qty}대</td>
                                        <td className="px-3 py-2 text-sm text-slate-600">{item.width} × {item.height}</td>
                                        <td className="px-3 py-2 text-xs text-slate-400">{item.note || '—'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* 물품 사진 */}
                            <div className="p-6 space-y-3 border-b border-slate-100">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2"><Camera className="w-4 h-4 text-indigo-500" /> 수거/폐기 물품사진</h4>
                              <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3].map(i => (
                                  <div key={i} className="aspect-[4/3] bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                                    <div className="text-center">
                                      <Image className="w-8 h-8 text-slate-300 mx-auto" />
                                      <p className="text-[10px] text-slate-400 mt-1">사진 {i}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 특이사항 */}
                            <div className="p-6">
                              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2"><MessageSquare className="w-4 h-4 text-indigo-500" /> 특이사항 (메모)</h4>
                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                                {detail.securityGrade === '기밀' ? '보안등급 기밀 — 반드시 봉인 운송 필수. 엘리베이터 사용 불가, 화물용 승강기 이용 요청.' : detail.securityGrade === '중요' ? '서버실 출입 시 방문자 등록 필요. 주차 가능. 하역장 B동 이용.' : '특이사항 없음.'}
                              </div>
                            </div>
                          </div>

                          {/* 하단 */}
                          <div className="p-4 border-t border-slate-200 flex justify-end">
                            <button onClick={() => setDispatchDetailModal(null)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">닫기</button>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })()}

                  {/* 기사 상세정보 모달 */}
                  {driverDetailModal && (() => {
                    const driver = calendarDrivers.find(d => d.name === driverDetailModal);
                    if (!driver) return null;
                    return (
                      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDriverDetailModal(null)}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                          onClick={e => e.stopPropagation()}
                        >
                          {/* 헤더 */}
                          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              <User className="w-5 h-5 text-indigo-600" />
                              기사 / 차량 정보
                            </h3>
                            <button onClick={() => setDriverDetailModal(null)} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                              <X className="w-4 h-4 text-slate-500" />
                            </button>
                          </div>

                          <div className="p-6 space-y-5">
                            {/* 기사 정보 */}
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">기사 신상정보</h4>
                              <div className="space-y-0">
                                {[
                                  { label: '기사명', value: driver.name },
                                  { label: '연락처', value: driver.phone },
                                  { label: '면허종별', value: driver.license },
                                  { label: '면허번호', value: driver.licenseNo, mono: true },
                                ].map((row, i) => (
                                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                                    <span className="text-sm text-slate-500">{row.label}</span>
                                    <span className={cn("text-sm font-bold text-slate-900", row.mono && "font-mono text-purple-700")}>{row.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 차량 정보 */}
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">차량 정보</h4>
                              <div className="space-y-0">
                                {[
                                  { label: '차량번호', value: driver.vehicle, mono: true },
                                  { label: '차량종류', value: driver.vehicleType },
                                  { label: '연식', value: `${driver.vehicleYear}년` },
                                  { label: '보험', value: driver.insurance },
                                ].map((row, i) => (
                                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                                    <span className="text-sm text-slate-500">{row.label}</span>
                                    <span className={cn("text-sm font-bold text-slate-900", row.mono && "font-mono text-purple-700")}>{row.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 하단 */}
                          <div className="p-4 border-t border-slate-200 flex justify-end">
                            <button onClick={() => setDriverDetailModal(null)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">닫기</button>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })()}
                  </>
                ) : (
                  /* ===== PROCESSOR / ADMIN / GOVERNMENT: Read-only table ===== */
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-indigo-600" />
                        배차 현황
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="신청번호 / 업체명 검색"
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 w-52"
                          />
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          {['전체', '배차대기', '배차완료'].map(f => (
                            <button
                              key={f}
                              onClick={() => setDispatchFilter(f)}
                              className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                                dispatchFilter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                              )}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">신청번호</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">신청 업체</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">자산 요약</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">수거일</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">배차 상태</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredDispatch.map(e => {
                            const dStatus = getDispatchStatus(e.id);
                            return (
                              <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-5 py-3 text-sm font-bold text-slate-900">{e.id}</td>
                                <td className="px-5 py-3">
                                  <p className="text-sm font-bold text-slate-900">{e.company}</p>
                                  <p className="text-xs text-slate-500">{e.applicant}</p>
                                </td>
                                <td className="px-5 py-3 text-sm text-slate-600 max-w-[180px]">
                                  <p className="truncate">{e.assetSummary}</p>
                                  <p className="text-xs text-slate-400">{e.assetCount}대 · {e.totalWeight}</p>
                                </td>
                                <td className="px-5 py-3 text-sm text-slate-700 font-bold">{e.collectionDate}</td>
                                <td className="px-5 py-3">
                                  <span
                                    className={cn(
                                      'px-2.5 py-1 rounded-lg text-[11px] font-bold',
                                      dStatus === '배차완료' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                    )}
                                  >
                                    {dStatus}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =================== TAB: 운송 정보 (emitter + admin) =================== */}
            {transportTab === 'info' && userRole !== 'emitter' && (
              <>
                {/* 배출건 선택 (상단 고정) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">배출건 선택</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {transportMonitorData.transports.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTransport(t.id)}
                        className={cn(
                          "p-3 border rounded-xl text-left transition-all flex items-center justify-between",
                          selectedTransport === t.id
                            ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20"
                            : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                        )}
                      >
                        <div>
                          <span className="text-sm font-bold text-slate-900">{t.emissionId || t.id}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{t.company} · {t.driver}</p>
                        </div>
                        <span className={cn(
                          'px-2 py-0.5 rounded-md text-[10px] font-bold',
                          t.status === '운송중' ? 'bg-blue-100 text-blue-700' :
                          t.status === '완료' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-500'
                        )}>
                          {t.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {!currentTransportData ? (
                  <div className="bg-slate-50 rounded-2xl p-8 text-center">
                    <p className="text-slate-400 text-sm">위에서 배출건을 선택해주세요.</p>
                  </div>
                ) : (
                  <>
                  {/* 축소형 요약 카드 */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3">
                      <ClipboardList className="w-4 h-4 text-indigo-500" />
                      <div><p className="text-[10px] text-slate-400">총 자산</p><p className="text-sm font-black text-slate-900">{totalAssets}대</p></div>
                    </div>
                    <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3">
                      <CheckCircle2 className={cn("w-4 h-4", integrityRate === 100 ? "text-emerald-500" : "text-amber-500")} />
                      <div><p className="text-[10px] text-slate-400">정합성</p><p className="text-sm font-black text-slate-900">{integrityRate}%</p></div>
                    </div>
                    <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3">
                      <Truck className={cn("w-4 h-4", transportStatus === '완료' ? "text-emerald-500" : transportStatus === '운송중' ? "text-indigo-500" : "text-slate-400")} />
                      <div><p className="text-[10px] text-slate-400">운송상태</p><p className="text-sm font-black text-slate-900">{transportStatus}</p></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {/* 운송 번호 헤더 */}
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl">
                        <span className="text-sm font-black text-indigo-700">{currentTransportData.id}</span>
                      </div>
                      <span className={cn(
                        'px-3 py-1.5 rounded-xl text-sm font-bold',
                        currentTransportData.status === '완료' ? 'bg-emerald-100 text-emerald-700' :
                        currentTransportData.status === '운송중' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'
                      )}>
                        {currentTransportData.status}
                      </span>
                    </div>

                    {/* 2x2 카드 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* 운송회사 카드 */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-indigo-600" />
                          운송회사
                        </h3>
                        <div className="space-y-3">
                          {[
                            { label: '회사명', value: currentTransportData.company },
                            { label: '봉인번호', value: currentTransportData.sealNumber, mono: true },
                            { label: '봉인 상태', value: currentTransportData.sealStatus, badge: true, ok: currentTransportData.sealStatus === '정상' },
                          ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                              <span className="text-sm text-slate-500">{row.label}</span>
                              {row.badge ? (
                                <span className={cn(
                                  'px-2.5 py-1 rounded-lg text-[11px] font-bold',
                                  row.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                )}>
                                  {row.value}
                                </span>
                              ) : (
                                <span className={cn(
                                  'text-sm font-bold text-slate-900',
                                  row.mono ? 'font-mono text-purple-700' : ''
                                )}>
                                  {row.value}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 운전자 카드 */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <User className="w-5 h-5 text-indigo-600" />
                          운전자
                        </h3>
                        <div className="space-y-3">
                          {[
                            { label: '기사명', value: currentTransportData.driver },
                            { label: '연락처', value: currentTransportData.driverPhone },
                          ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                              <span className="text-sm text-slate-500">{row.label}</span>
                              <span className="text-sm font-bold text-slate-900">{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 차량 카드 */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-indigo-600" />
                          차량
                        </h3>
                        <div className="space-y-3">
                          {[
                            { label: '차량 정보', value: currentTransportData.vehicle },
                            { label: 'GPS 추적', value: 'ON — 실시간 연결 중' },
                            { label: '차량 잠금', value: '잠금 상태' },
                          ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                              <span className="text-sm text-slate-500">{row.label}</span>
                              <span className="text-sm font-bold text-slate-900">{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 운송일정 카드 */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-indigo-600" />
                          운송일정
                        </h3>
                        <div className="space-y-3">
                          {[
                            { label: '출발지', value: currentTransportData.from },
                            { label: '도착지', value: currentTransportData.to },
                            { label: '출발 시각', value: currentTransportData.departTime },
                            { label: '예상 도착', value: currentTransportData.estimatedArrival },
                            { label: '자산 수량', value: `${currentTransportData.assetCount}대` },
                          ].map((row, i) => (
                            <div key={i} className="flex items-start justify-between py-2 border-b border-slate-50 last:border-0 gap-4">
                              <span className="text-sm text-slate-500 shrink-0">{row.label}</span>
                              <span className="text-sm font-bold text-slate-900 text-right">{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                  </>
                )}
              </>
            )}

            {/* =================== TAB: 운송 모니터링 (Leaflet 지도 통합 뷰) =================== */}
            {transportTab === 'monitoring' && userRole !== 'emitter' && (
              <>
                <div className="flex gap-0 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white" style={{ height: 'calc(100vh - 280px)', minHeight: 500 }}>
                  {/* 좌측: 배출요청건 목록 */}
                  <div className="w-[320px] border-r border-slate-200 flex flex-col flex-shrink-0">
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-slate-900">배출요청건 ({transportMonitorData.transports.length})</p>
                      </div>
                      <div className="flex items-center gap-3 text-[10px]">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span><span className="font-bold text-blue-600">운송중 {transportMonitorData.transports.filter(t => t.status === '운송중').length}</span></span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span><span className="font-bold text-emerald-600">완료 {transportMonitorData.transports.filter(t => t.status === '완료').length}</span></span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-300 rounded-full"></span><span className="font-bold text-slate-400">대기 {transportMonitorData.transports.filter(t => t.status !== '운송중' && t.status !== '완료').length}</span></span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {transportMonitorData.transports.map(t => (
                        <div
                          key={t.id}
                          className={cn(
                            "px-4 py-3.5 border-b border-slate-100 cursor-pointer transition-all",
                            selectedTransport === t.id ? "bg-indigo-50 border-l-4 border-l-indigo-500" : "hover:bg-slate-50 border-l-4 border-l-transparent"
                          )}
                        >
                          <div onClick={() => setSelectedTransport(t.id)}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold text-slate-900">{t.emissionId || t.id}</span>
                              <span className={cn(
                                'px-2 py-0.5 rounded-md text-[10px] font-bold',
                                t.status === '운송중' ? 'bg-blue-100 text-blue-700' :
                                t.status === '완료' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                              )}>{t.status}</span>
                            </div>
                            <p className="text-xs text-slate-600">{t.company}</p>
                            <div className="flex items-center justify-between mt-1.5">
                              <p className="text-[10px] text-slate-400">{t.vehicle} · {t.driver} · {t.assetCount}대</p>
                              <button
                                onClick={(e) => { e.stopPropagation(); setTransportDetailModal(t.id); }}
                                className="text-[10px] text-indigo-600 font-bold hover:underline"
                              >
                                상세보기
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 우측: Leaflet 실제 지도 */}
                  <div className="flex-1 relative">
                    <div
                      id="other-role-transport-map"
                      className="w-full h-full"
                      style={{ zIndex: 0 }}
                      ref={(el) => {
                        if (!el || (el as any).__leaflet_map) return;
                        const L = (window as any).L;
                        if (!L) return;
                        const map = L.map(el, { zoomControl: false }).setView([37.35, 127.1], 10);
                        L.control.zoom({ position: 'bottomright' }).addTo(map);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                          attribution: '&copy; OpenStreetMap',
                          maxZoom: 18,
                        }).addTo(map);

                        const startLatLng: [number, number] = [37.5087, 127.0632];
                        const endLatLng: [number, number] = [37.2411, 127.1775];

                        const createIcon = (color: string, label: string) =>
                          L.divIcon({
                            className: '',
                            html: `<div style="width:28px;height:28px;background:${color};border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:10px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${label}</div>`,
                            iconSize: [28, 28],
                            iconAnchor: [14, 14],
                          });

                        L.marker(startLatLng, { icon: createIcon('#10b981', 'S') }).addTo(map).bindPopup('<b>출발지</b><br>서울 강남구 테헤란로 521');
                        L.marker(endLatLng, { icon: createIcon('#ef4444', 'E') }).addTo(map).bindPopup('<b>ITAD 처리센터</b><br>경기 용인시 처인구');

                        const routePoints: [number, number][] = [
                          startLatLng, [37.48, 127.08], [37.44, 127.10], [37.40, 127.12],
                          [37.36, 127.14], [37.32, 127.16], [37.28, 127.17], endLatLng,
                        ];
                        L.polyline(routePoints, { color: '#1e293b', weight: 7, opacity: 0.3, lineCap: 'round', lineJoin: 'round' }).addTo(map);
                        L.polyline(routePoints, { color: '#4f46e5', weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(map);

                        const vehiclePositions: [number, number][] = [
                          [37.45, 127.09], [37.40, 127.11], [37.36, 127.13], [37.48, 127.07], [37.30, 127.16],
                        ];
                        const statusColors: Record<string, string> = { '운송중': '#3b82f6', '완료': '#10b981' };
                        transportMonitorData.transports.forEach((t: any, i: number) => {
                          const pos = vehiclePositions[i % vehiclePositions.length];
                          const color = statusColors[t.status] || '#94a3b8';
                          const marker = L.marker(pos, {
                            icon: createIcon(color, String(i + 1)),
                          }).addTo(map);
                          marker.bindPopup(`<b>${t.emissionId || t.id}</b><br>${t.company}<br>${t.vehicle} · ${t.driver}<br>상태: ${t.status}`);
                          marker.on('click', () => setSelectedTransport(t.id));
                        });

                        (el as any).__leaflet_map = map;
                        setTimeout(() => map.invalidateSize(), 200);
                      }}
                    ></div>
                  </div>
                </div>

                {/* 운송 알림 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-600" />
                      운송 알림
                    </h3>
                    <span className="text-[10px] text-slate-400">최근 24시간</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-[200px] overflow-y-auto">
                    {[
                      { time: '14:32', type: '경로이탈', msg: 'DSP-2026-00123: 설정 경로에서 1.2km 이탈 감지', level: 'danger' },
                      { time: '13:15', type: '상차완료', msg: 'DSP-2026-00124: K-ITAD 전자 상차 완료, 운송 시작', level: 'info' },
                      { time: '11:40', type: '배차확정', msg: 'DSP-2026-00125: 박운송 기사 배정 완료 (서울12가3456)', level: 'info' },
                      { time: '10:05', type: '도착완료', msg: 'DSP-2026-00122: ITAD 처리센터 도착, 하차 대기중', level: 'success' },
                      { time: '09:30', type: '운송지연', msg: 'DSP-2026-00121: 예상 도착시간 대비 25분 지연', level: 'warning' },
                      { time: '08:50', type: '인수완료', msg: 'DSP-2026-00120: 하차 인수인계 완료, 봉인 정상', level: 'success' },
                    ].map((n, i) => (
                      <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                        <span className="text-[10px] text-slate-400 font-mono w-10 flex-shrink-0 pt-0.5">{n.time}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-bold flex-shrink-0",
                          n.level === 'danger' ? "bg-rose-100 text-rose-700" :
                          n.level === 'warning' ? "bg-amber-100 text-amber-700" :
                          n.level === 'success' ? "bg-emerald-100 text-emerald-700" :
                          "bg-blue-100 text-blue-700"
                        )}>{n.type}</span>
                        <p className="text-xs text-slate-600 leading-relaxed">{n.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 상세정보 모달 */}
                {transportDetailModal && (() => {
                  const detail = transportMonitorData.transports.find(t => t.id === transportDetailModal);
                  if (!detail) return null;
                  return (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center" style={{ zIndex: 9999 }} onClick={() => setTransportDetailModal(null)}>
                      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-black text-slate-900">운송 상세정보</h3>
                          <button onClick={() => setTransportDetailModal(null)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200"><X className="w-4 h-4 text-slate-500" /></button>
                        </div>
                        <div className="space-y-0">
                          {[
                            { label: '배출신청번호', value: detail.emissionId || detail.id },
                            { label: '운송회사', value: detail.company },
                            { label: '운전자', value: detail.driver },
                            { label: '차량번호', value: detail.vehicle },
                            { label: '자산수', value: `${detail.assetCount}대` },
                            { label: '운송상태', value: detail.status },
                            { label: '출발지', value: detail.from || '서울 강남구 테헤란로' },
                            { label: '도착지', value: detail.to || '경기 용인시 ITAD센터' },
                            { label: '봉인번호', value: detail.sealNumber, mono: true },
                            { label: '봉인상태', value: detail.sealStatus || '정상' },
                          ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                              <span className="text-sm text-slate-500">{row.label}</span>
                              <span className={cn("text-sm font-bold text-slate-900", row.mono && "font-mono text-purple-700")}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </motion.div>
        );
      }


      case 'disposal': {
        const isDisposalReadOnly = userRole === 'emitter' || userRole === 'government';
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 pb-20"
          >
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-rose-600" />
                데이터 폐기
              </h1>
              <p className="text-slate-500 mt-1">
                {isDisposalReadOnly ? '배출신청건별 데이터 폐기 현황을 조회합니다.' : '배출요청건별 데이터 폐기 작업을 수행하고 결과를 등록합니다.'}
              </p>
            </div>

            {/* ===== 탭 메뉴 ===== */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200">
                {[
                  { key: 'receiving' as const, label: '입고 현황', icon: CalendarDays },
                  { key: 'status' as const, label: '작업 현황', icon: ClipboardList },
                  ...(!isDisposalReadOnly ? [{ key: 'work' as const, label: '작업 수행 / 결과 등록', icon: PenTool }] : []),
                  ...(!isDisposalReadOnly ? [{ key: 'verify' as const, label: '검증 / 인증서', icon: ShieldCheck }] : []),
                  { key: 'stats' as const, label: '통계 · 분석', icon: BarChart3 },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setDisposalTab(tab.key)}
                    className={cn(
                      "flex-1 py-4 text-sm font-bold transition-all border-b-2 flex items-center justify-center gap-2",
                      disposalTab === tab.key ? "text-rose-600 border-rose-600 bg-rose-50/50" : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* ===== 입고 현황 캘린더 ===== */}
                {disposalTab === 'receiving' && (() => {
                  // 입고 샘플 데이터
                  const receivingData = [
                    { id: 'RCV-001', emissionId: 'DSP-2026-00123', company: 'K-ITAD 전자', department: 'IT인프라팀', assetCount: 8, assetTypes: '서버 3, PC 2, 노트북 3', date: '2026-03-10', status: '입고완료' as const },
                    { id: 'RCV-002', emissionId: 'DSP-2026-00120', company: '현대모비스', department: 'DX실', assetCount: 3, assetTypes: '서버 2, PC 1', date: '2026-03-11', status: '입고완료' as const },
                    { id: 'RCV-003', emissionId: 'DSP-2026-00124', company: 'SKT', department: 'IT인프라팀', assetCount: 4, assetTypes: 'PC 2, 노트북 2', date: '2026-03-14', status: '입고완료' as const },
                    { id: 'RCV-004', emissionId: 'DSP-2026-00118', company: '삼성전자', department: '정보보안팀', assetCount: 12, assetTypes: '서버 4, PC 5, 노트북 3', date: '2026-03-17', status: '입고완료' as const },
                    { id: 'RCV-005', emissionId: 'DSP-2026-00125', company: 'LG전자', department: 'IT운영팀', assetCount: 6, assetTypes: '서버 2, 노트북 4', date: '2026-03-20', status: '입고완료' as const },
                    { id: 'RCV-006', emissionId: 'DSP-2026-00126', company: '카카오', department: '인프라팀', assetCount: 15, assetTypes: '서버 8, PC 4, 네트워크 3', date: '2026-03-24', status: '입고완료' as const },
                    { id: 'RCV-007', emissionId: 'DSP-2026-00127', company: '네이버', department: 'IT보안팀', assetCount: 10, assetTypes: '서버 5, PC 3, 노트북 2', date: '2026-03-27', status: '입고완료' as const },
                    { id: 'RCV-008', emissionId: 'DSP-2026-00128', company: '우리은행', department: 'IT센터', assetCount: 20, assetTypes: '서버 10, PC 6, 노트북 4', date: '2026-03-31', status: '입고예정' as const },
                    { id: 'RCV-009', emissionId: 'DSP-2026-00129', company: 'KB국민은행', department: '전산팀', assetCount: 8, assetTypes: '서버 3, PC 3, 노트북 2', date: '2026-04-02', status: '입고예정' as const },
                    { id: 'RCV-010', emissionId: 'DSP-2026-00130', company: '포스코', department: 'DX센터', assetCount: 14, assetTypes: '서버 6, PC 5, 네트워크 3', date: '2026-04-04', status: '입고예정' as const },
                    { id: 'RCV-011', emissionId: 'DSP-2026-00131', company: '현대자동차', department: 'IT인프라팀', assetCount: 25, assetTypes: '서버 12, PC 8, 노트북 5', date: '2026-04-07', status: '입고예정' as const },
                    { id: 'RCV-012', emissionId: 'DSP-2026-00132', company: 'SK하이닉스', department: '정보보호팀', assetCount: 18, assetTypes: '서버 9, PC 5, 노트북 4', date: '2026-04-10', status: '입고예정' as const },
                    { id: 'RCV-013', emissionId: 'DSP-2026-00133', company: '삼성SDI', department: 'IT팀', assetCount: 7, assetTypes: '서버 2, PC 3, 노트북 2', date: '2026-04-14', status: '입고예정' as const },
                  ];

                  const year = receivingMonth.getFullYear();
                  const month = receivingMonth.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const calendarDays: (number | null)[] = [];
                  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
                  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
                  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

                  const getEventsForDay = (day: number) => {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    return receivingData.filter(r => r.date === dateStr);
                  };

                  const todayStr = new Date().toISOString().slice(0, 10);
                  const totalReceived = receivingData.filter(r => r.status === '입고완료').length;
                  const totalExpected = receivingData.filter(r => r.status === '입고예정').length;
                  const totalAssets = receivingData.reduce((a, r) => a + r.assetCount, 0);

                  return (
                    <div className="space-y-6">
                      {/* 요약 */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-emerald-50 rounded-xl p-4 text-center">
                          <p className="text-xs font-bold text-emerald-600">입고완료</p>
                          <p className="text-2xl font-black text-emerald-700">{totalReceived}건</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-4 text-center">
                          <p className="text-xs font-bold text-amber-600">입고예정</p>
                          <p className="text-2xl font-black text-amber-700">{totalExpected}건</p>
                        </div>
                        <div className="bg-indigo-50 rounded-xl p-4 text-center">
                          <p className="text-xs font-bold text-indigo-600">총 자산수</p>
                          <p className="text-2xl font-black text-indigo-700">{totalAssets}건</p>
                        </div>
                      </div>

                      {/* 캘린더 네비게이션 */}
                      <div className="flex items-center justify-between">
                        <button onClick={() => setReceivingMonth(new Date(year, month - 1, 1))} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                          <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <h3 className="text-lg font-bold text-slate-900">{year}년 {month + 1}월</h3>
                        <button onClick={() => setReceivingMonth(new Date(year, month + 1, 1))} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                          <ChevronRight className="w-5 h-5 text-slate-600" />
                        </button>
                      </div>

                      {/* 캘린더 그리드 */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        {/* 요일 헤더 */}
                        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
                          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                            <div key={d} className={cn("py-3 text-center text-xs font-bold", i === 0 ? "text-rose-500" : i === 6 ? "text-blue-500" : "text-slate-500")}>{d}</div>
                          ))}
                        </div>
                        {/* 날짜 셀 */}
                        <div className="grid grid-cols-7">
                          {calendarDays.map((day, idx) => {
                            const events = day ? getEventsForDay(day) : [];
                            const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
                            const isToday = dateStr === todayStr;
                            const dayOfWeek = idx % 7;
                            return (
                              <div key={idx} className={cn(
                                "min-h-[110px] border-b border-r border-slate-100 p-1.5",
                                !day && "bg-slate-50/50",
                                isToday && "bg-rose-50/40"
                              )}>
                                {day && (
                                  <>
                                    <div className={cn(
                                      "text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full",
                                      isToday ? "bg-rose-600 text-white" : dayOfWeek === 0 ? "text-rose-500" : dayOfWeek === 6 ? "text-blue-500" : "text-slate-700"
                                    )}>
                                      {day}
                                    </div>
                                    <div className="space-y-1">
                                      {events.map(ev => (
                                        <div key={ev.id} className={cn(
                                          "px-1.5 py-1 rounded-md text-[10px] font-bold truncate cursor-default",
                                          ev.status === '입고완료' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                        )} title={`${ev.company} · ${ev.assetTypes} (${ev.assetCount}건)`}>
                                          <span className={cn(
                                            "inline-block w-1.5 h-1.5 rounded-full mr-1",
                                            ev.status === '입고완료' ? "bg-emerald-500" : "bg-amber-500"
                                          )} />
                                          {ev.company} ({ev.assetCount})
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 범례 */}
                      <div className="flex items-center gap-6 justify-end">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="text-xs font-bold text-slate-600">입고완료</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-amber-500" />
                          <span className="text-xs font-bold text-slate-600">입고예정</span>
                        </div>
                      </div>

                      {/* 입고 목록 테이블 */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-700 mb-3">입고 목록</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">입고번호</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출신청번호</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출처</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부서</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산수</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산구성</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">입고일</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">상태</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {receivingData.filter(r => {
                                const rDate = new Date(r.date);
                                return rDate.getFullYear() === year && rDate.getMonth() === month;
                              }).map(r => (
                                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{r.id}</td>
                                  <td className="px-4 py-3 text-sm text-rose-600 font-bold">{r.emissionId}</td>
                                  <td className="px-4 py-3 text-sm font-medium text-slate-700">{r.company}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{r.department}</td>
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{r.assetCount}건</td>
                                  <td className="px-4 py-3 text-xs text-slate-500">{r.assetTypes}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{r.date}</td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      r.status === '입고완료' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                    )}>{r.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* ===== 탭A: 작업 현황 ===== */}
                {disposalTab === 'status' && (
                  <div className="space-y-6">
                    {/* 배출요청건 목록 */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3">배출요청건 목록</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">신청번호</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출처</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부서</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산수</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">진행률</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">상태</th>
                              {!isDisposalReadOnly && <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">작업</th>}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {disposalEmissionGroups.map(g => {
                              const rate = Math.round((g.completedCount / g.totalCount) * 100);
                              const isSelected = selectedEmissionForDisposal === g.emissionId;
                              return (
                                <tr key={g.emissionId}
                                  onClick={() => setSelectedEmissionForDisposal(isSelected ? null : g.emissionId)}
                                  className={cn("cursor-pointer transition-colors", isSelected ? "bg-rose-50" : "hover:bg-slate-50")}
                                >
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{g.emissionId}</td>
                                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">{g.company}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{g.department}</td>
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{g.totalCount}건</td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rate}%` }} />
                                      </div>
                                      <span className="text-xs font-bold text-slate-600">{rate}%</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      rate === 100 ? "bg-emerald-100 text-emerald-700" :
                                      g.inProgressCount > 0 ? "bg-blue-100 text-blue-700" :
                                      "bg-slate-100 text-slate-600"
                                    )}>{rate === 100 ? '완료' : g.inProgressCount > 0 ? '작업중' : '대기'}</span>
                                  </td>
                                  {!isDisposalReadOnly && (
                                    <td className="px-4 py-3">
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedEmissionForDisposal(g.emissionId); setDisposalTab('work'); setDisposalCheckedAssets([]); }}
                                        className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition-all"
                                      >
                                        결과 등록
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 선택된 요청건의 자산 목록 */}
                    {selectedEmissionForDisposal && (
                      <div className="border-t border-slate-200 pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold text-slate-700">
                            {selectedEmissionForDisposal} 자산 목록
                            <span className="ml-2 text-slate-400 font-normal">({selectedEmissionAssets.length}건)</span>
                          </h4>
                          <div className="flex items-center gap-2">
                            {disposalSteps.map(step => {
                              const count = selectedEmissionAssets.filter(a => mapDisposalStep(a.step) === step).length;
                              return count > 0 ? (
                                <span key={step} className={cn("px-2 py-1 rounded-md text-[10px] font-bold",
                                  step === '완료' ? "bg-emerald-100 text-emerald-700" :
                                  step === '폐기중' ? "bg-blue-100 text-blue-700" :
                                  "bg-slate-100 text-slate-600"
                                )}>{step} {count}</span>
                              ) : null;
                            })}
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산번호</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">유형</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">모델명</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">매체</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">용량</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">폐기 방식</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">단계</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">담당자</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedEmissionAssets.map(asset => (
                                <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{asset.assetId}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.type}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.model}</td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                                      asset.mediaType === 'HDD' ? "bg-blue-100 text-blue-700" :
                                      asset.mediaType === 'SSD' ? "bg-purple-100 text-purple-700" :
                                      "bg-amber-100 text-amber-700"
                                    )}>{asset.mediaType}</span>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.capacity}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.method || '—'}</td>
                                  <td className="px-4 py-3">
                                    {(() => { const s = mapDisposalStep(asset.step); return (
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      s === '완료' ? "bg-emerald-100 text-emerald-700" :
                                      s === '폐기중' ? "bg-blue-100 text-blue-700" :
                                      "bg-slate-100 text-slate-600"
                                    )}>{s}</span>
                                    ); })()}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.operator || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ===== 탭B: 작업 수행 / 결과 등록 ===== */}
                {disposalTab === 'work' && (
                  <div className="space-y-6">
                    {!selectedEmissionForDisposal ? (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Clipboard className="w-12 h-12 mb-4 text-slate-300" />
                        <p className="text-sm font-bold">작업 현황 탭에서 배출요청건을 선택하고</p>
                        <p className="text-sm">&lsquo;결과 등록&rsquo; 버튼을 클릭해 주세요.</p>
                        <button onClick={() => setDisposalTab('status')} className="mt-4 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all">
                          작업 현황으로 이동
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* 배출요청건 요약 */}
                        <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-900">{selectedEmissionForDisposal}</span>
                            <span className="text-sm text-slate-500">{selectedEmissionAssets[0]?.company} / {selectedEmissionAssets[0]?.department}</span>
                            <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                              selectedEmissionAssets[0]?.securityGrade === '극비' ? "bg-rose-100 text-rose-700" :
                              selectedEmissionAssets[0]?.securityGrade === '기밀' ? "bg-purple-100 text-purple-700" :
                              "bg-amber-100 text-amber-700"
                            )}>{selectedEmissionAssets[0]?.securityGrade}</span>
                          </div>
                          <button onClick={() => { setSelectedEmissionForDisposal(null); setDisposalTab('status'); }} className="text-xs text-slate-500 hover:text-slate-700 font-bold flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3" /> 목록으로
                          </button>
                        </div>

                        {/* 자산 선택 테이블 (체크박스) */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-slate-700">폐기 대상 자산 선택</h4>
                            <span className="text-xs text-slate-400">{disposalCheckedAssets.length}건 선택됨</span>
                          </div>
                          <div className="overflow-x-auto border border-slate-200 rounded-xl">
                            <table className="w-full text-left">
                              <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                  <th className="px-4 py-3 w-10">
                                    <input
                                      type="checkbox"
                                      checked={disposalCheckedAssets.length === selectedEmissionAssets.filter(a => a.step !== '완료').length && selectedEmissionAssets.filter(a => a.step !== '완료').length > 0}
                                      onChange={(e) => setDisposalCheckedAssets(e.target.checked ? selectedEmissionAssets.filter(a => a.step !== '완료').map(a => a.id) : [])}
                                      className="rounded border-slate-300"
                                    />
                                  </th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산번호</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">유형 / 모델</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">매체</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">S/N</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">현재 단계</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {selectedEmissionAssets.map(asset => (
                                  <tr key={asset.id} className={cn("transition-colors",
                                    asset.step === '완료' ? "bg-emerald-50/30 opacity-50" :
                                    disposalCheckedAssets.includes(asset.id) ? "bg-rose-50" : "hover:bg-slate-50"
                                  )}>
                                    <td className="px-4 py-3">
                                      <input
                                        type="checkbox"
                                        disabled={asset.step === '완료'}
                                        checked={disposalCheckedAssets.includes(asset.id)}
                                        onChange={(e) => setDisposalCheckedAssets(e.target.checked ? [...disposalCheckedAssets, asset.id] : disposalCheckedAssets.filter(id => id !== asset.id))}
                                        className="rounded border-slate-300"
                                      />
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold text-slate-900">{asset.assetId}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{asset.type} / {asset.model}</td>
                                    <td className="px-4 py-3">
                                      <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                                        asset.mediaType === 'HDD' ? "bg-blue-100 text-blue-700" :
                                        asset.mediaType === 'SSD' ? "bg-purple-100 text-purple-700" :
                                        "bg-amber-100 text-amber-700"
                                      )}>{asset.mediaType} {asset.capacity}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-mono text-slate-500">{asset.serialNumber}</td>
                                    <td className="px-4 py-3">
                                      <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                        asset.step === '완료' ? "bg-emerald-100 text-emerald-700" :
                                        asset.step === '작업중' ? "bg-blue-100 text-blue-700" :
                                        "bg-slate-100 text-slate-600"
                                      )}>{asset.step}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* 일괄 결과 등록 폼 */}
                        {disposalCheckedAssets.length > 0 && (
                          <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 space-y-5">
                            <div className="flex items-center gap-2">
                              <PenTool className="w-5 h-5 text-rose-600" />
                              <h4 className="text-lg font-bold text-slate-900">일괄 결과 등록</h4>
                              <span className="px-2 py-0.5 bg-rose-100 text-rose-600 rounded-md text-xs font-bold">{disposalCheckedAssets.length}건 선택됨</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">삭제 방법</label>
                                <select
                                  value={disposalWorkForm.method}
                                  onChange={(e) => setDisposalWorkForm({...disposalWorkForm, method: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                >
                                  <option>소프트웨어 삭제</option>
                                  <option>디가우징</option>
                                  <option>물리파괴</option>
                                  <option>복합처리</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">삭제 등급</label>
                                <select
                                  value={disposalWorkForm.grade}
                                  onChange={(e) => setDisposalWorkForm({...disposalWorkForm, grade: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                >
                                  <option>NIST 800-88</option>
                                  <option>DoD 5220.22-M</option>
                                  <option>Gutmann 35-pass</option>
                                  <option>자체기준</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">사용 도구/장비</label>
                                <select
                                  value={disposalWorkForm.software}
                                  onChange={(e) => setDisposalWorkForm({...disposalWorkForm, software: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                >
                                  <option>Blancco Drive Eraser 7.2</option>
                                  <option>Certus Erasure</option>
                                  <option>디가우저 HD-3WXL</option>
                                  <option>파쇄기 SSD-2000</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">작업자</label>
                                <select
                                  value={disposalWorkForm.operator}
                                  onChange={(e) => setDisposalWorkForm({...disposalWorkForm, operator: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                >
                                  <option>김보안</option>
                                  <option>박파쇄</option>
                                  <option>이기사</option>
                                  <option>정분해</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">처리 결과</label>
                                <select
                                  value={disposalWorkForm.result}
                                  onChange={(e) => setDisposalWorkForm({...disposalWorkForm, result: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                >
                                  <option>성공</option>
                                  <option>실패</option>
                                  <option>부분삭제</option>
                                </select>
                              </div>
                              {disposalWorkForm.result !== '성공' && (
                                <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-slate-700">실패 사유</label>
                                  <input
                                    type="text"
                                    placeholder="사유를 입력하세요"
                                    value={disposalWorkForm.failReason}
                                    onChange={(e) => setDisposalWorkForm({...disposalWorkForm, failReason: e.target.value})}
                                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                              <button
                                onClick={() => alert(`${disposalCheckedAssets.length}건의 폐기 결과가 일괄 등록되었습니다.`)}
                                className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                                {disposalCheckedAssets.length}건 일괄 등록
                              </button>
                              <button
                                onClick={() => setDisposalCheckedAssets([])}
                                className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                              >
                                선택 해제
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* ===== 탭C: 검증 / 인증서 ===== */}
                {disposalTab === 'verify' && (
                  <div className="space-y-6">
                    {/* 검증 대기 목록 */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3">검증 대기 건</h4>
                      {(() => {
                        const verifyAssets = disposalAssets.filter(a => a.step === '검증대기' || a.step === '검증');
                        return verifyAssets.length > 0 ? (
                          <div className="overflow-x-auto border border-slate-200 rounded-xl">
                            <table className="w-full text-left">
                              <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산번호</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출처</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">유형 / 모델</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">매체</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">폐기 방식</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">작업자</th>
                                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">검증</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {verifyAssets.map(asset => (
                                  <tr key={asset.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 text-sm font-bold text-slate-900">{asset.assetId}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{asset.company}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{asset.type} / {asset.model}</td>
                                    <td className="px-4 py-3">
                                      <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                                        asset.mediaType === 'HDD' ? "bg-blue-100 text-blue-700" :
                                        asset.mediaType === 'SSD' ? "bg-purple-100 text-purple-700" :
                                        "bg-amber-100 text-amber-700"
                                      )}>{asset.mediaType}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{asset.method}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{asset.operator}</td>
                                    <td className="px-4 py-3">
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => alert(`${asset.assetId} 검증 완료 (Pass)`)}
                                          className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all"
                                        >
                                          Pass
                                        </button>
                                        <button
                                          onClick={() => alert(`${asset.assetId} 검증 실패 (Fail)`)}
                                          className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition-all"
                                        >
                                          Fail
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl">
                            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                            <p className="text-sm font-bold">검증 대기 건이 없습니다.</p>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 인증서 발급 목록 */}
                    <div className="border-t border-slate-200 pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-slate-700">발급된 인증서 (CoD)</h4>
                        <button
                          onClick={() => {}}
                          disabled={certChecked.length === 0}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all",
                            certChecked.length > 0 ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          )}
                        >
                          <Download className="w-4 h-4" />
                          일괄 다운로드 ({certChecked.length})
                        </button>
                      </div>
                      <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 w-10">
                                <input
                                  type="checkbox"
                                  checked={certChecked.length === disposalCerts.length && disposalCerts.length > 0}
                                  onChange={(e) => setCertChecked(e.target.checked ? disposalCerts.map(c => c.id) : [])}
                                  className="rounded border-slate-300"
                                />
                              </th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">인증서 번호</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출신청번호</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산 수</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">폐기 방식</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">발급일</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">상태</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">다운로드</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {disposalCerts.map(cert => (
                              <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3">
                                  <input
                                    type="checkbox"
                                    checked={certChecked.includes(cert.id)}
                                    onChange={(e) => setCertChecked(e.target.checked ? [...certChecked, cert.id] : certChecked.filter(id => id !== cert.id))}
                                    className="rounded border-slate-300"
                                  />
                                </td>
                                <td className="px-4 py-3 text-sm font-bold text-slate-900">{cert.id}</td>
                                <td className="px-4 py-3 text-sm text-rose-600 font-bold">{cert.emissionId}</td>
                                <td className="px-4 py-3 text-sm font-bold text-slate-900">{cert.assetCount}건</td>
                                <td className="px-4 py-3 text-sm text-slate-600">{cert.method}</td>
                                <td className="px-4 py-3 text-sm text-slate-600">{cert.issueDate}</td>
                                <td className="px-4 py-3">
                                  <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                    cert.status === '유효' ? "bg-emerald-100 text-emerald-700" :
                                    "bg-slate-100 text-slate-500"
                                  )}>{cert.status}</span>
                                </td>
                                <td className="px-4 py-3">
                                  <button className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-1">
                                    <Download className="w-3 h-3" /> PDF
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== 탭④: 통계 · 분석 ===== */}
                {disposalTab === 'stats' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* 폐기 방식별 비율 (도넛) */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700">폐기 방식별 비율</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={disposalMethodChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                                {disposalMethodChartData.map((entry, i) => (
                                  <Cell key={i} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                              <Legend iconType="circle" formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* 월별 처리량 추이 (라인) */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700">월별 처리량 추이</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={disposalMonthlyData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                              <Legend formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                              <Bar yAxisId="left" dataKey="count" name="처리 건수" fill="#6366f1" radius={[6, 6, 0, 0]} />
                              <Line yAxisId="right" type="monotone" dataKey="capacity" name="용량(TB)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* 매체 유형별 처리량 (스택 바) */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700">매체 유형별 처리량</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={disposalMediaTypeData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                              <Legend formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                              <Bar dataKey="HDD" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                              <Bar dataKey="SSD" stackId="a" fill="#8b5cf6" />
                              <Bar dataKey="NVMe" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* 평균 처리 소요시간 (바) */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700">평균 처리 소요시간 (분)</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={disposalAvgTimeData} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <YAxis type="category" dataKey="method" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} width={100} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                              <Bar dataKey="time" name="소요시간(분)" fill="#6366f1" radius={[0, 6, 6, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      }

      case 'processing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 pb-20"
          >
            {/* 헤더 + 기간 조회 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <Cog className="w-8 h-8 text-orange-600" />
                  자산 처리
                </h1>
                <p className="text-slate-500 mt-1">데이터 폐기 완료 자산의 검수 → 분해 → 처분까지 전 과정을 추적 관리합니다.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                  <CalendarDays className="w-4 h-4 text-slate-400" />
                  <input type="date" value={processingStartDate} onChange={e => setProcessingStartDate(e.target.value)} className="bg-transparent text-sm outline-none text-slate-700 w-[130px]" />
                  <span className="text-slate-400 text-sm">~</span>
                  <input type="date" value={processingEndDate} onChange={e => setProcessingEndDate(e.target.value)} className="bg-transparent text-sm outline-none text-slate-700 w-[130px]" />
                </div>
                {(processingStartDate || processingEndDate) && (
                  <button onClick={() => { setProcessingStartDate(''); setProcessingEndDate(''); }} className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">초기화</button>
                )}
              </div>
            </div>

            {/* 탭 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200">
                {([
                  { key: 'inspection' as const, label: '입고/검수', icon: ClipboardList },
                  { key: 'disassembly' as const, label: '분해/분류', icon: Layers },
                  { key: 'disposition' as const, label: '처분 관리', icon: GitBranch },
                  { key: 'stats' as const, label: '통계', icon: BarChart3 },
                ]).map(tab => (
                  <button key={tab.key} onClick={() => setProcessingTab(tab.key)}
                    className={cn("flex-1 py-4 text-sm font-bold transition-all border-b-2 flex items-center justify-center gap-2",
                      processingTab === tab.key ? "text-orange-600 border-orange-600 bg-orange-50/50" : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"
                    )}>
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* ===== 탭A: 입고/검수 ===== */}
                {processingTab === 'inspection' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3">배출요청건 목록 (데이터폐기 완료)</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">신청번호</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출처</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산수</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">검수 진행률</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">작업</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {procEmissionGroups.map(g => {
                              const rate = Math.round((g.inspectedCount / g.totalCount) * 100);
                              return (
                                <tr key={g.emissionId}
                                  onClick={() => setSelectedProcEmission(selectedProcEmission === g.emissionId ? null : g.emissionId)}
                                  className={cn("cursor-pointer transition-colors", selectedProcEmission === g.emissionId ? "bg-orange-50" : "hover:bg-slate-50")}
                                >
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{g.emissionId}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{g.company} / {g.department}</td>
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{g.totalCount}건</td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${rate}%` }} />
                                      </div>
                                      <span className="text-xs font-bold text-slate-600">{rate}%</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setSelectedProcEmission(g.emissionId); setProcCheckedAssets([]); }}
                                      className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition-all"
                                    >
                                      검수 등록
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 선택된 요청건 자산 + 검수 폼 */}
                    {selectedProcEmission && (
                      <div className="border-t border-slate-200 pt-6 space-y-4">
                        <h4 className="text-sm font-bold text-slate-700">{selectedProcEmission} 자산 목록</h4>
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-3 w-10">
                                  <input type="checkbox"
                                    checked={procCheckedAssets.length === selectedProcAssets.filter(a => a.stage === '검수대기').length && selectedProcAssets.filter(a => a.stage === '검수대기').length > 0}
                                    onChange={(e) => setProcCheckedAssets(e.target.checked ? selectedProcAssets.filter(a => a.stage === '검수대기').map(a => a.id) : [])}
                                    className="rounded border-slate-300"
                                  />
                                </th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산번호</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">유형 / 모델</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">단계</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">판정</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">검수자</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedProcAssets.map(asset => (
                                <tr key={asset.id} className={cn("transition-colors",
                                  asset.stage !== '검수대기' ? "bg-emerald-50/30 opacity-60" :
                                  procCheckedAssets.includes(asset.id) ? "bg-orange-50" : "hover:bg-slate-50"
                                )}>
                                  <td className="px-4 py-3">
                                    <input type="checkbox" disabled={asset.stage !== '검수대기'}
                                      checked={procCheckedAssets.includes(asset.id)}
                                      onChange={(e) => setProcCheckedAssets(e.target.checked ? [...procCheckedAssets, asset.id] : procCheckedAssets.filter(id => id !== asset.id))}
                                      className="rounded border-slate-300"
                                    />
                                  </td>
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{asset.assetId}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.type} / {asset.model}</td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      asset.stage === '검수대기' ? "bg-slate-100 text-slate-600" :
                                      asset.stage === '검수완료' ? "bg-emerald-100 text-emerald-700" :
                                      asset.stage === '분해중' ? "bg-amber-100 text-amber-700" :
                                      "bg-blue-100 text-blue-700"
                                    )}>{asset.stage}</span>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.verdict || '—'}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.inspector || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* 일괄 검수 폼 */}
                        {procCheckedAssets.length > 0 && (
                          <div className="bg-orange-50/50 border border-orange-200 rounded-2xl p-6 space-y-5">
                            <div className="flex items-center gap-2">
                              <ClipboardList className="w-5 h-5 text-orange-600" />
                              <h4 className="text-lg font-bold text-slate-900">검수 결과 등록</h4>
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-md text-xs font-bold">{procCheckedAssets.length}건</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">외관 상태</label>
                                <select value={procInspectionForm.appearance} onChange={(e) => setProcInspectionForm({...procInspectionForm, appearance: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500">
                                  <option>양호</option><option>손상</option><option>파손</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">작동 여부</label>
                                <select value={procInspectionForm.working} onChange={(e) => setProcInspectionForm({...procInspectionForm, working: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500">
                                  <option>정상</option><option>불량</option><option>미확인</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">판정</label>
                                <select value={procInspectionForm.verdict} onChange={(e) => setProcInspectionForm({...procInspectionForm, verdict: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500">
                                  <option>재사용 가능</option><option>분해 대상</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">검수자</label>
                                <select value={procInspectionForm.inspector} onChange={(e) => setProcInspectionForm({...procInspectionForm, inspector: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500">
                                  <option>정분해</option><option>김보안</option><option>박파쇄</option><option>이기사</option>
                                </select>
                              </div>
                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold text-slate-700">비고</label>
                                <input type="text" placeholder="검수 메모" value={procInspectionForm.note}
                                  onChange={(e) => setProcInspectionForm({...procInspectionForm, note: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500"
                                />
                              </div>
                            </div>
                            <button onClick={() => alert(`${procCheckedAssets.length}건 검수 결과가 등록되었습니다.`)}
                              className="px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5" /> {procCheckedAssets.length}건 검수 등록
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ===== 탭B: 분해/분류 ===== */}
                {processingTab === 'disassembly' && (
                  <div className="space-y-6">
                    {/* 분해 대상 자산 목록 */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3">분해 대상 자산</h4>
                      <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산번호</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">유형 / 모델</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출처</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">단계</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품수</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">작업자</th>
                              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">작업</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {procIncomingAssets.filter(a => a.verdict === '분해 대상').map(asset => {
                              const parts = procParts.filter(p => p.parentId === asset.id);
                              const isSelected = selectedDisassemblyAsset === asset.id;
                              return (
                                <tr key={asset.id}
                                  onClick={() => setSelectedDisassemblyAsset(isSelected ? null : asset.id)}
                                  className={cn("cursor-pointer transition-colors", isSelected ? "bg-orange-50" : "hover:bg-slate-50")}
                                >
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{asset.assetId}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.type} / {asset.model}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.company}</td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      asset.stage === '분해완료' || asset.stage === '처분완료' ? "bg-emerald-100 text-emerald-700" :
                                      asset.stage === '분해중' ? "bg-amber-100 text-amber-700" :
                                      "bg-slate-100 text-slate-600"
                                    )}>{asset.stage}</span>
                                  </td>
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{parts.length}개</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.inspector || '—'}</td>
                                  <td className="px-4 py-3">
                                    <button onClick={(e) => { e.stopPropagation(); setSelectedDisassemblyAsset(asset.id); }}
                                      className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition-all">
                                      {parts.length > 0 ? '부품 보기' : '분해 등록'}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 선택된 자산의 분해 부품 목록 */}
                    {selectedDisassemblyAsset && (() => {
                      const asset = procIncomingAssets.find(a => a.id === selectedDisassemblyAsset);
                      const parts = procParts.filter(p => p.parentId === selectedDisassemblyAsset);
                      return (
                        <div className="border-t border-slate-200 pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h4 className="text-sm font-bold text-slate-700">{asset?.assetId} — {asset?.model} 분해 부품</h4>
                              <span className="text-xs text-slate-400">{parts.length}개 부품</span>
                            </div>
                            <button onClick={() => { setNewPartForm({ name: '', category: 'CPU', condition: '양호', route: '', material: '', weight: '', value: '' }); setAddPartModal(true); }}
                              className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-all flex items-center gap-1">
                              + 부품 추가
                            </button>
                          </div>

                          {parts.length > 0 ? (
                            <div className="overflow-x-auto border border-slate-200 rounded-xl">
                              <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                  <tr>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품 코드</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품명</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">카테고리</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">상태</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">처분 경로</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">소재</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">중량</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">예상 가치</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {parts.map(part => (
                                    <tr key={part.id} className="hover:bg-slate-50">
                                      <td className="px-4 py-3 text-sm font-mono font-bold text-slate-900">{part.id}</td>
                                      <td className="px-4 py-3 text-sm text-slate-700">{part.name}</td>
                                      <td className="px-4 py-3">
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold">{part.category}</span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                                          part.condition === '양호' ? "bg-emerald-100 text-emerald-700" :
                                          part.condition === '불량' || part.condition === '수명초과' ? "bg-rose-100 text-rose-700" :
                                          "bg-slate-100 text-slate-600"
                                        )}>{part.condition}</span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                          part.route === '재제조' ? "bg-blue-100 text-blue-700" :
                                          part.route === '재활용' ? "bg-emerald-100 text-emerald-700" :
                                          part.route === '폐기' ? "bg-rose-100 text-rose-700" :
                                          "bg-slate-100 text-slate-600"
                                        )}>{part.route || '미배정'}</span>
                                      </td>
                                      <td className="px-4 py-3 text-sm text-slate-500">{part.material || '—'}</td>
                                      <td className="px-4 py-3 text-sm text-slate-600">{part.weight}</td>
                                      <td className="px-4 py-3 text-sm font-bold text-slate-700">{part.value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-xl text-slate-400">
                              <Layers className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-sm font-bold">아직 분해 등록된 부품이 없습니다.</p>
                              <p className="text-xs mt-1">위의 &lsquo;+ 부품 추가&rsquo; 버튼으로 부품을 등록하세요.</p>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* 부품 추가 모달 */}
                    {addPartModal && (
                      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setAddPartModal(false)}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                          onClick={e => e.stopPropagation()}
                        >
                          <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              <Layers className="w-5 h-5 text-orange-600" />
                              부품 등록
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                              {(() => { const a = procIncomingAssets.find(x => x.id === selectedDisassemblyAsset); return a ? `${a.assetId} — ${a.model}` : ''; })()}
                            </p>
                          </div>

                          <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700">부품명 <span className="text-rose-500">*</span></label>
                              <input type="text" value={newPartForm.name} onChange={e => setNewPartForm({...newPartForm, name: e.target.value})}
                                placeholder="예: CPU (Xeon Gold 6248)"
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">카테고리 <span className="text-rose-500">*</span></label>
                                <select value={newPartForm.category} onChange={e => setNewPartForm({...newPartForm, category: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500">
                                  {['CPU', 'RAM', 'Storage', 'PSU', 'PCB', 'Chassis', 'Cooling', 'Cable', 'Display', 'Battery', '기타'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">상태</label>
                                <select value={newPartForm.condition} onChange={e => setNewPartForm({...newPartForm, condition: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500">
                                  {['양호', '손상', '불량', '수명초과'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">처분 경로</label>
                                <select value={newPartForm.route} onChange={e => setNewPartForm({...newPartForm, route: e.target.value})}
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500">
                                  <option value="">미배정</option>
                                  <option value="재제조">재제조</option>
                                  <option value="재활용">재활용</option>
                                  <option value="폐기">폐기</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">중량</label>
                                <input type="text" value={newPartForm.weight} onChange={e => setNewPartForm({...newPartForm, weight: e.target.value})}
                                  placeholder="예: 1.5kg"
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">소재 정보</label>
                                <input type="text" value={newPartForm.material} onChange={e => setNewPartForm({...newPartForm, material: e.target.value})}
                                  placeholder="예: Au 0.3g, Cu 45g"
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">예상 가치</label>
                                <input type="text" value={newPartForm.value} onChange={e => setNewPartForm({...newPartForm, value: e.target.value})}
                                  placeholder="예: ₩85,000"
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500" />
                              </div>
                            </div>
                          </div>

                          <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
                            <button onClick={() => setAddPartModal(false)}
                              className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
                              취소
                            </button>
                            <button onClick={() => {
                              if (!newPartForm.name) { alert('부품명을 입력해주세요.'); return; }
                              const asset = procIncomingAssets.find(x => x.id === selectedDisassemblyAsset);
                              if (!asset) return;
                              const existingParts = procParts.filter(p => p.parentId === selectedDisassemblyAsset);
                              const newPart = {
                                id: `P-${selectedDisassemblyAsset?.replace('PRC-', '')}-${existingParts.length + 1}`,
                                parentId: selectedDisassemblyAsset || '',
                                parentAsset: asset.assetId,
                                parentModel: asset.model,
                                name: newPartForm.name,
                                category: newPartForm.category,
                                condition: newPartForm.condition,
                                route: newPartForm.route,
                                material: newPartForm.material,
                                weight: newPartForm.weight || '—',
                                value: newPartForm.value || '—',
                                dispositionStatus: '미처분',
                              };
                              setProcParts(prev => [...prev, newPart]);
                              setAddPartModal(false);
                            }}
                              className="px-5 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                              등록
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}

                {/* ===== 탭C: 처분 관리 ===== */}
                {processingTab === 'disposition' && (
                  <div className="space-y-6">
                    {/* 필터 */}
                    <div className="flex gap-2">
                      {['전체', '재사용', '재제조', '재활용', '폐기'].map(f => (
                        <button key={f} onClick={() => setProcDispositionFilter(f)}
                          className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all",
                            procDispositionFilter === f ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          )}>
                          {f}
                        </button>
                      ))}
                    </div>

                    {/* 재사용 제품 */}
                    {(procDispositionFilter === '전체' || procDispositionFilter === '재사용') && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-blue-500" /> 재사용 출하
                          <span className="text-slate-400 font-normal">— 검수에서 재사용 가능 판정된 제품</span>
                        </h4>
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                          <table className="w-full text-left">
                            <thead className="bg-blue-50/50 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산번호</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">유형 / 모델</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출처</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">상태</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">출하 등록</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {procIncomingAssets.filter(a => a.verdict === '재사용 가능').map(asset => (
                                <tr key={asset.id} className="hover:bg-slate-50">
                                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{asset.assetId}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.type} / {asset.model}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{asset.company}</td>
                                  <td className="px-4 py-3"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-[11px] font-bold">재사용 가능</span></td>
                                  <td className="px-4 py-3">
                                    <button onClick={() => alert(`${asset.assetId} 출하 등록`)}
                                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
                                      출하 등록
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 재제조 부품 */}
                    {(procDispositionFilter === '전체' || procDispositionFilter === '재제조') && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-indigo-500" /> 재제조 부품 출하
                          <span className="text-slate-400 font-normal">— 분해 후 재제조 가능 판정 부품</span>
                        </h4>
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                          <table className="w-full text-left">
                            <thead className="bg-indigo-50/50 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품코드</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품명</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">원 자산</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">상태</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">예상 가치</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">처분</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {procParts.filter(p => p.route === '재제조').map(part => (
                                <tr key={part.id} className="hover:bg-slate-50">
                                  <td className="px-4 py-3 text-sm font-mono font-bold text-slate-900">{part.id}</td>
                                  <td className="px-4 py-3 text-sm text-slate-700">{part.name}</td>
                                  <td className="px-4 py-3 text-sm text-slate-500">{part.parentAsset} ({part.parentModel})</td>
                                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-bold">{part.condition}</span></td>
                                  <td className="px-4 py-3 text-sm font-bold text-slate-700">{part.value}</td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      part.dispositionStatus === '출하완료' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                                    )}>{part.dispositionStatus}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 재활용 원료 */}
                    {(procDispositionFilter === '전체' || procDispositionFilter === '재활용') && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-emerald-500" /> 재활용 원료 납품
                          <span className="text-slate-400 font-normal">— 소재별 분류 후 원료 납품</span>
                        </h4>
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                          <table className="w-full text-left">
                            <thead className="bg-emerald-50/50 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품코드</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품명</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">소재</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">중량</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">예상 가치</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">처분</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {procParts.filter(p => p.route === '재활용').map(part => (
                                <tr key={part.id} className="hover:bg-slate-50">
                                  <td className="px-4 py-3 text-sm font-mono font-bold text-slate-900">{part.id}</td>
                                  <td className="px-4 py-3 text-sm text-slate-700">{part.name}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{part.material || '—'}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{part.weight}</td>
                                  <td className="px-4 py-3 text-sm font-bold text-slate-700">{part.value}</td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      part.dispositionStatus === '납품완료' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                                    )}>{part.dispositionStatus}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 폐기 (소각/매립) */}
                    {(procDispositionFilter === '전체' || procDispositionFilter === '폐기') && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500" /> 폐기 (소각/매립)
                          <span className="text-slate-400 font-normal">— 재활용 불가 잔재물</span>
                        </h4>
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                          <table className="w-full text-left">
                            <thead className="bg-rose-50/50 border-b border-slate-200">
                              <tr>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품코드</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">부품명</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">원 자산</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">중량</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">처분</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {procParts.filter(p => p.route === '폐기').map(part => (
                                <tr key={part.id} className="hover:bg-slate-50">
                                  <td className="px-4 py-3 text-sm font-mono font-bold text-slate-900">{part.id}</td>
                                  <td className="px-4 py-3 text-sm text-slate-700">{part.name}</td>
                                  <td className="px-4 py-3 text-sm text-slate-500">{part.parentAsset}</td>
                                  <td className="px-4 py-3 text-sm text-slate-600">{part.weight}</td>
                                  <td className="px-4 py-3">
                                    <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                      part.dispositionStatus === '소각완료' ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                                    )}>{part.dispositionStatus}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ===== 탭D: 통계 ===== */}
                {processingTab === 'stats' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* 월별 처분 경로 추이 */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700">월별 처분 경로 추이</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={assetProcessingData.dispositionStats.monthly}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                              <Legend formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                              <Bar dataKey="reuse" name="재사용" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                              <Bar dataKey="partsRecovery" name="재제조" stackId="b" fill="#6366f1" />
                              <Bar dataKey="recycle" name="재활용" fill="#10b981" />
                              <Bar dataKey="waste" name="폐기(소각/매립)" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* 자원 회수량 */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-700">자원 회수량 (누적)</h4>
                        <div className="space-y-3">
                          {assetProcessingData.dispositionStats.materialRecovery.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                              <span className="text-sm font-bold text-slate-700">{m.material}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-600">{m.recovered}</span>
                                <span className="text-sm font-bold text-emerald-600">{m.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 경제적 가치 */}
                    <div className="bg-orange-50 rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-slate-700 mb-4">경제적 가치 요약</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                          { label: '재사용 매각', value: `₩${(assetProcessingData.dispositionStats.economics.resaleRevenue / 10000).toFixed(0)}만`, color: 'text-blue-600' },
                          { label: '부품 매각', value: `₩${(assetProcessingData.dispositionStats.economics.partsRevenue / 10000).toFixed(0)}만`, color: 'text-indigo-600' },
                          { label: '원료 매각', value: `₩${(assetProcessingData.dispositionStats.economics.materialRevenue / 10000).toFixed(0)}만`, color: 'text-emerald-600' },
                          { label: '처분 비용', value: `-₩${(assetProcessingData.dispositionStats.economics.disposalCost / 10000).toFixed(0)}만`, color: 'text-rose-600' },
                          { label: '순 가치', value: `₩${(assetProcessingData.dispositionStats.economics.netValue / 10000).toFixed(0)}만`, color: 'text-orange-700' },
                        ].map((stat, i) => (
                          <div key={i} className="text-center">
                            <p className="text-xs font-bold text-slate-500">{stat.label}</p>
                            <p className={cn("text-xl font-black mt-1", stat.color)}>{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </motion.div>
        );

      case 'settlement': {
        const settlementCenterOptions = ['경기남부센터', '서울센터', '부산센터'];
        const settlementData = [
          // 자산매입금 (배출처가 자산을 매각 → 배출처 매출, 처리사 매입)
          { id: 'STL-001', emissionId: 'DSP-2026-00123', company: 'K-ITAD 전자', type: '매출', category: '자산매입금', amount: 3200000, date: '2026-03-10', status: '정산완료', items: '노트북 24대, 서버 2대', taxInvoice: 'TX-20260310-001' },
          { id: 'STL-002', emissionId: 'DSP-2026-00120', company: 'SKT', type: '매출', category: '자산매입금', amount: 5800000, date: '2026-03-08', status: '정산완료', items: '서버 12대', taxInvoice: 'TX-20260308-001' },
          { id: 'STL-003', emissionId: 'DSP-2026-00118', company: '현대모비스', type: '매출', category: '자산매입금', amount: 1500000, date: '2026-03-05', status: '정산완료', items: 'PC 30대', taxInvoice: 'TX-20260305-001' },
          // 보안운송비 (운송회사가 서비스 제공 → 운송회사 매출, 배출처 매입)
          { id: 'STL-004', emissionId: 'DSP-2026-00123', company: '로지스', type: '매입', category: '보안운송비', amount: -450000, date: '2026-03-11', status: '정산완료', items: '보안운송 1건 (강남→용인)', taxInvoice: 'TX-20260311-001' },
          { id: 'STL-005', emissionId: 'DSP-2026-00120', company: '지순', type: '매입', category: '보안운송비', amount: -680000, date: '2026-03-09', status: '정산완료', items: '보안운송 1건 (분당→용인)', taxInvoice: '' },
          { id: 'STL-006', emissionId: 'DSP-2026-00124', company: '로지스', type: '매입', category: '보안운송비', amount: -320000, date: '2026-03-22', status: '정산대기', items: '보안운송 1건 (여의도→용인)', taxInvoice: '' },
          // 재사용/재제조 판매 (처리사→유통사 판매 → 처리사 매출)
          { id: 'STL-007', emissionId: 'DSP-2026-00123', company: '리맨(유통)', type: '매출', category: '재사용 판매', amount: 4200000, date: '2026-03-15', status: '정산완료', items: '노트북 18대 (리퍼비시)', taxInvoice: 'TX-20260315-001' },
          { id: 'STL-008', emissionId: 'DSP-2026-00120', company: '리맨(유통)', type: '매출', category: '재사용 판매', amount: 8500000, date: '2026-03-18', status: '정산완료', items: '서버 8대 (부품재제조)', taxInvoice: 'TX-20260318-001' },
          { id: 'STL-009', emissionId: 'DSP-2026-00118', company: '리맨(유통)', type: '매출', category: '재사용 판매', amount: 2100000, date: '2026-03-20', status: '정산대기', items: 'PC 15대 (리퍼비시)', taxInvoice: '' },
          // 파분쇄 (처리사→파분쇄사 납품 → 처리사 매출)
          { id: 'STL-010', emissionId: 'DSP-2026-00123', company: '미래시안', type: '매출', category: '파분쇄', amount: 850000, date: '2026-03-16', status: '정산완료', items: '기판류 120kg', taxInvoice: 'TX-20260316-001' },
          { id: 'STL-011', emissionId: 'DSP-2026-00120', company: '미래시안', type: '매출', category: '파분쇄', amount: 1200000, date: '2026-03-19', status: '미정산', items: '기판류 180kg', taxInvoice: '' },
          // 재활용원료 (처리사→제련사 납품 → 처리사 매출)
          { id: 'STL-012', emissionId: 'DSP-2026-00123', company: '한민', type: '매출', category: '재활용원료', amount: 1650000, date: '2026-03-17', status: '정산완료', items: '금속류 250kg (구리/알루미늄)', taxInvoice: 'TX-20260317-001' },
          { id: 'STL-013', emissionId: 'DSP-2026-00118', company: '한민', type: '매출', category: '재활용원료', amount: 980000, date: '2026-03-21', status: '정산대기', items: '금속류 150kg (구리)', taxInvoice: '' },
          { id: 'STL-014', emissionId: 'DSP-2026-00124', company: '한민', type: '매출', category: '재활용원료', amount: 2300000, date: '2026-03-25', status: '미정산', items: '금속류 320kg (구리/금/은)', taxInvoice: '' },
          // 확인서 발급비 (배출처→처리사 지급 → 배출처 매입)
          { id: 'STL-015', emissionId: 'DSP-2026-00123', company: 'K-ITAD 전자', type: '매입', category: '확인서 발급비', amount: -150000, date: '2026-03-15', status: '정산완료', items: 'CoD 인증서 1건', taxInvoice: 'TX-20260315-002' },
          { id: 'STL-016', emissionId: 'DSP-2026-00120', company: 'SKT', type: '매입', category: '확인서 발급비', amount: -150000, date: '2026-03-18', status: '정산완료', items: 'CoD 인증서 1건', taxInvoice: 'TX-20260318-002' },
          // 운송회사(보안물류) 매출 - 보안운송비
          { id: 'STL-017', emissionId: 'DSP-2026-00123', company: '보안물류(주)', type: '매출', category: '보안운송비', amount: 450000, date: '2026-03-11', status: '정산완료', items: '보안운송 1건 (강남→용인)', taxInvoice: 'TX-20260311-002' },
          { id: 'STL-018', emissionId: 'DSP-2026-00120', company: '보안물류(주)', type: '매출', category: '보안운송비', amount: 680000, date: '2026-03-09', status: '정산완료', items: '보안운송 1건 (분당→용인)', taxInvoice: 'TX-20260309-001' },
          { id: 'STL-019', emissionId: 'DSP-2026-00124', company: '보안물류(주)', type: '매출', category: '보안운송비', amount: 320000, date: '2026-03-22', status: '정산대기', items: '보안운송 1건 (여의도→용인)', taxInvoice: '' },
          { id: 'STL-020', emissionId: 'DSP-2026-00118', company: '보안물류(주)', type: '매출', category: '보안운송비', amount: 520000, date: '2026-03-06', status: '정산완료', items: '보안운송 1건 (판교→용인)', taxInvoice: 'TX-20260306-001' },
          { id: 'STL-021', emissionId: 'DSP-2026-00125', company: '보안물류(주)', type: '매출', category: '보안운송비', amount: 890000, date: '2026-03-25', status: '미정산', items: '보안운송 1건 (마포→용인) 대형장비', taxInvoice: '' },
          { id: 'STL-022', emissionId: 'DSP-2026-00126', company: '보안물류(주)', type: '매출', category: '보안운송비', amount: 350000, date: '2026-03-27', status: '정산대기', items: '보안운송 1건 (성수→용인)', taxInvoice: '' },
        ];
        const settlementByRole = (userRole === 'admin' || userRole === 'processor') ? settlementData : settlementData.filter(s => s.company === userCompany);
        const settlementFiltered = settlementByRole.filter(s => {
          if (settlementStartDate && s.date < settlementStartDate) return false;
          if (settlementEndDate && s.date > settlementEndDate) return false;
          return true;
        });
        const totalRevenue = settlementFiltered.filter(s => s.amount > 0).reduce((a, s) => a + s.amount, 0);
        const totalExpense = settlementFiltered.filter(s => s.amount < 0).reduce((a, s) => a + s.amount, 0);
        const totalBalance = totalRevenue + totalExpense;
        const canIssueTaxInvoice = userRole === 'processor' || (totalBalance > 0 && (userRole === 'emitter' || userRole === 'transporter'));

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 pb-20"
          >
            {/* 헤더 */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <CircleDollarSign className="w-8 h-8 text-violet-600" />
                정산 관리
              </h1>
              <p className="text-slate-500 mt-1">
                {userRole === 'admin' ? '전체 정산 내역을 조회합니다.' :
                 userRole === 'processor' ? '센터별 매입/매출을 조회하고 세금계산서를 발급합니다.' :
                 '내 매입/매출 내역을 조회합니다.'}
              </p>
            </div>

            {/* 처리사: 센터 선택 드롭다운 */}
            {userRole === 'processor' && (
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 flex items-center gap-4">
                <span className="text-sm font-bold text-violet-700">센터 선택</span>
                <select className="px-4 py-2 bg-white border border-violet-200 rounded-xl text-sm font-bold text-violet-700 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500">
                  {settlementCenterOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

            {/* 정산 내역 테이블 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-900">정산 내역</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                    <CalendarDays className="w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={settlementStartDate}
                      onChange={e => setSettlementStartDate(e.target.value)}
                      className="bg-transparent text-sm outline-none text-slate-700 w-[130px]"
                    />
                    <span className="text-slate-400 text-sm">~</span>
                    <input
                      type="date"
                      value={settlementEndDate}
                      onChange={e => setSettlementEndDate(e.target.value)}
                      className="bg-transparent text-sm outline-none text-slate-700 w-[130px]"
                    />
                  </div>
                  {(settlementStartDate || settlementEndDate) && (
                    <button
                      onClick={() => { setSettlementStartDate(''); setSettlementEndDate(''); }}
                      className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                    >
                      초기화
                    </button>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">정산번호</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출신청번호</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">거래처명</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">정산유형</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">매입/매출</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">금액</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">항목</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">정산일</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">상태</th>
                      {canIssueTaxInvoice && <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">세금계산서</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {settlementFiltered.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-slate-900">{s.id}</td>
                        <td className="px-4 py-3 text-sm text-violet-600 font-bold">{s.emissionId}</td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">{s.company}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{s.category}</td>
                        <td className="px-4 py-3">
                          <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                            s.type === '매출' ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
                          )}>{s.type}</span>
                        </td>
                        <td className={cn("px-4 py-3 text-sm font-bold", s.amount >= 0 ? "text-blue-600" : "text-rose-600")}>
                          {s.amount >= 0 ? '+' : ''}{s.amount.toLocaleString()}원
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{s.items}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{s.date}</td>
                        <td className="px-4 py-3">
                          <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                            s.status === '정산완료' ? "bg-emerald-100 text-emerald-700" :
                            s.status === '정산대기' ? "bg-amber-100 text-amber-700" :
                            "bg-slate-100 text-slate-600"
                          )}>{s.status}</span>
                        </td>
                        {canIssueTaxInvoice && (
                          <td className="px-4 py-3">
                            {s.amount > 0 ? (
                              <button
                                onClick={() => alert(`${s.id} 세금계산서 발급 요청`)}
                                className="px-3 py-1.5 bg-violet-50 text-violet-600 rounded-lg text-xs font-bold hover:bg-violet-100 transition-all flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3" /> 발급
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400">—</span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        );
      }

      case 'circulation':
        const circStatOptionsAll = [
          { key: 'processing', label: '처리량 추이', desc: '월별 처리 건수 및 누적' },
          { key: 'carbon', label: '탄소 절감량', desc: 'CO₂e 절감 추이' },
          { key: 'landfill', label: '매립 회피량', desc: '매립 회피 중량' },
          { key: 'economic', label: '잔존가치 회수', desc: '회수액 및 추세' },
          { key: 'collection', label: '수거 추이', desc: '건수 및 중량' },
          { key: 'material', label: '원자재 회수', desc: '소재별 회수량' },
          { key: 'lifespan', label: '수명 연장', desc: '리퍼 사용 연수' },
        ];
        const circStatOptions = userRole === 'emitter'
          ? circStatOptionsAll.filter(o => o.key !== 'economic' && o.key !== 'material')
          : circStatOptionsAll;
        const circPeriodOptions = ['최근 3개월', '최근 6개월', '최근 1년'];
        const circSelectedStat = selectedCircStat;
        const circPeriod = selectedCircPeriod;

        // 배출처별 요약 데이터
        const circEmissionSummaryAll = [
          { emissionId: 'DSP-2026-00123', company: 'K-ITAD 전자', department: 'IT인프라팀', totalAssets: 8, reuse: 1, recycle: 4, waste: 1, inProgress: 2, co2Saved: 3200, recoveryValue: 2850000 },
          { emissionId: 'DSP-2026-00124', company: 'SKT', department: 'IT인프라팀', totalAssets: 4, reuse: 0, recycle: 0, waste: 0, inProgress: 4, co2Saved: 0, recoveryValue: 0 },
          { emissionId: 'DSP-2026-00120', company: '현대모비스', department: 'DX실', totalAssets: 3, reuse: 0, recycle: 2, waste: 1, inProgress: 0, co2Saved: 4100, recoveryValue: 3200000 },
          { emissionId: 'DSP-2026-00118', company: '삼성SDS', department: 'IT보안팀', totalAssets: 18, reuse: 5, recycle: 10, waste: 3, inProgress: 0, co2Saved: 6500, recoveryValue: 4800000 },
          { emissionId: 'DSP-2026-00105', company: 'LG전자', department: '인프라운영팀', totalAssets: 8, reuse: 2, recycle: 4, waste: 2, inProgress: 0, co2Saved: 2800, recoveryValue: 1950000 },
        ];
        // 역할에 따라 필터링: 배출처는 자기 데이터만, 관리자는 전체
        const circEmissionSummary = (userRole === 'admin' || userRole === 'processor' || userRole === 'government') ? circEmissionSummaryAll : circEmissionSummaryAll.filter(e => e.company === userCompany);
        const circTotalAssets = circEmissionSummary.reduce((s, e) => s + e.totalAssets, 0);
        const circTotalCo2 = circEmissionSummary.reduce((s, e) => s + e.co2Saved, 0);
        const circTotalRecovery = circEmissionSummary.reduce((s, e) => s + e.recoveryValue, 0);
        const circTotalReuse = circEmissionSummary.reduce((s, e) => s + e.reuse, 0);
        const circTotalRecycle = circEmissionSummary.reduce((s, e) => s + e.recycle, 0);
        const circTotalWaste = circEmissionSummary.reduce((s, e) => s + e.waste, 0);
        const circTotalDone = circTotalReuse + circTotalRecycle + circTotalWaste;
        const circCirculationRate = circTotalDone > 0 ? Math.round(((circTotalReuse + circTotalRecycle) / circTotalDone) * 100) : 0;

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 pb-20"
          >
            {/* 헤더 */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Recycle className="w-8 h-8 text-emerald-600" />
                자원 순환
              </h1>
              <p className="text-slate-500 mt-1">
                {(userRole === 'admin' || userRole === 'processor') ? '전체 배출처의 자원순환 성과를 통합 조회합니다.' : `${userCompany}의 배출건별 자원순환 성과를 확인합니다.`}
              </p>
            </div>

            {/* 관리자/처리사 모드 안내 */}
            {(userRole === 'admin' || userRole === 'processor') && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">{userRole === 'admin' ? '관리자' : '처리사'} 모드</span>
                <span className="text-xs text-emerald-600">전체 배출처 데이터를 조회하고 있습니다.</span>
              </div>
            )}

            {/* 요약 카드 */}
            <div className={cn("grid gap-4", userRole === 'emitter' ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4")}>
              {[
                { label: '자원순환율', value: `${circCirculationRate}%`, sub: '(재사용+재활용) ÷ 총 처리', icon: Recycle, color: 'emerald' },
                { label: '탄소 절감량', value: `${circTotalCo2 > 1000 ? `${(circTotalCo2 / 1000).toFixed(1)}t` : `${circTotalCo2}kg`}`, sub: 'CO₂e 누적 절감', icon: Leaf, color: 'emerald' },
                { label: '처리 자산', value: `${circTotalAssets}건`, sub: userRole === 'admin' ? `${circEmissionSummary.length}개 배출처` : `${circEmissionSummary.length}건의 배출요청`, icon: Database, color: 'blue' },
                ...(userRole !== 'emitter' ? [{ label: '잔존가치 회수', value: `₩${(circTotalRecovery / 10000).toFixed(0)}만`, sub: '재판매 + 원료 수익', icon: TrendingUp, color: 'indigo' }] : []),
              ].map((card, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center",
                      card.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                      card.color === 'blue' ? "bg-blue-50 text-blue-600" :
                      "bg-indigo-50 text-indigo-600"
                    )}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-500">{card.label}</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{card.value}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1">{card.sub}</p>
                </div>
              ))}
            </div>

            {/* 처리 방식 비율 + 배출건별 테이블 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 처리 방식 비율 도넛 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">처리 방식 비율</h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={processingMethodData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                        {processingMethodData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                      <Legend iconType="circle" formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 배출건별 자원순환 현황 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-700 mb-4">
                  {(userRole === 'admin' || userRole === 'processor') ? '배출처별 자원순환 현황' : `${userCompany} 배출건별 현황`}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">신청번호</th>
                        {(userRole === 'admin' || userRole === 'processor') && <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">배출처</th>}
                        <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">부서</th>
                        <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">자산</th>
                        <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">재사용</th>
                        <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">재활용</th>
                        <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">폐기</th>
                        <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">CO₂ 절감</th>
                        {userRole !== 'emitter' && <th className="px-3 py-2.5 text-xs font-bold text-slate-500 uppercase">회수가치</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {circEmissionSummary.map(e => (
                        <tr key={e.emissionId} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2.5 text-sm font-bold text-slate-900">{e.emissionId}</td>
                          {(userRole === 'admin' || userRole === 'processor') && (
                            <td className="px-3 py-2.5 text-sm font-medium text-slate-700">{e.company}</td>
                          )}
                          <td className="px-3 py-2.5 text-sm text-slate-500">{e.department}</td>
                          <td className="px-3 py-2.5 text-sm font-bold text-slate-900">{e.totalAssets}</td>
                          <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[11px] font-bold">{e.reuse}</span></td>
                          <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-bold">{e.recycle}</span></td>
                          <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[11px] font-bold">{e.waste}</span></td>
                          <td className="px-3 py-2.5 text-sm text-emerald-600 font-bold">{e.co2Saved > 0 ? `${(e.co2Saved / 1000).toFixed(1)}t` : '—'}</td>
                          {userRole !== 'emitter' && <td className="px-3 py-2.5 text-sm font-bold text-slate-700">{e.recoveryValue > 0 ? `₩${(e.recoveryValue / 10000).toFixed(0)}만` : '—'}</td>}
                        </tr>
                      ))}
                    </tbody>
                    {circEmissionSummary.length > 1 && (
                      <tfoot className="bg-slate-50 border-t-2 border-slate-300">
                        <tr>
                          <td className="px-3 py-2.5 text-sm font-black text-slate-900" colSpan={(userRole === 'admin' || userRole === 'processor') ? 3 : 2}>합계</td>
                          <td className="px-3 py-2.5 text-sm font-black text-slate-900">{circTotalAssets}</td>
                          <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-md text-[11px] font-black">{circTotalReuse}</span></td>
                          <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded-md text-[11px] font-black">{circTotalRecycle}</span></td>
                          <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-rose-200 text-rose-800 rounded-md text-[11px] font-black">{circTotalWaste}</span></td>
                          <td className="px-3 py-2.5 text-sm text-emerald-700 font-black">{circTotalCo2 > 1000 ? `${(circTotalCo2 / 1000).toFixed(1)}t` : `${circTotalCo2}kg`}</td>
                          {userRole !== 'emitter' && <td className="px-3 py-2.5 text-sm font-black text-slate-900">₩{(circTotalRecovery / 10000).toFixed(0)}만</td>}
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* 기간별 통계 영역 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">기간별 통계</h3>
                  <div className="flex gap-2">
                    {circPeriodOptions.map(p => (
                      <button key={p} onClick={() => setSelectedCircPeriod(p)}
                        className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          circPeriod === p ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        )}>{p}</button>
                    ))}
                  </div>
                </div>
                {/* 통계 항목 선택 */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {circStatOptions.map(opt => (
                    <button key={opt.key} onClick={() => setSelectedCircStat(opt.key)}
                      className={cn("px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border",
                        circSelectedStat === opt.key ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      )}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="h-72">
                  {circSelectedStat === 'processing' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={operationalData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                        <Legend formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                        <Bar yAxisId="left" dataKey="count" name="월별 처리(대)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="cumulative" name="누적(대)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  )}
                  {circSelectedStat === 'carbon' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={esgCarbonData}>
                        <defs>
                          <linearGradient id="colorCarbonCirc" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                        <Area type="monotone" dataKey="reduction" name="절감량 (kg CO₂e)" stroke="#10b981" strokeWidth={3} fill="url(#colorCarbonCirc)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  {circSelectedStat === 'landfill' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={landfillAvoidanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                        <Bar dataKey="weight" name="매립 회피량 (kg)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  {circSelectedStat === 'economic' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={economicValueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} formatter={(value: number) => [`₩${value.toLocaleString()}`, '']} />
                        <Legend formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                        <Bar dataKey="recovery" name="회수액" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        <Line type="monotone" dataKey="trend" name="추세" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  )}
                  {circSelectedStat === 'collection' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={collectionTrendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                        <Legend formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                        <Bar yAxisId="left" dataKey="count" name="수거 건수" fill="#10b981" radius={[6, 6, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="weight" name="중량(kg)" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  )}
                  {circSelectedStat === 'material' && (
                    <div className="h-full flex items-center">
                      <div className="w-full space-y-4">
                        {[
                          { name: '금 (Au)', value: 25, unit: 'g', max: 50, color: 'bg-amber-400', textColor: 'text-amber-700' },
                          { name: '은 (Ag)', value: 88, unit: 'g', max: 150, color: 'bg-slate-400', textColor: 'text-slate-700' },
                          { name: '구리 (Cu)', value: 240, unit: 'kg', max: 400, color: 'bg-orange-400', textColor: 'text-orange-700' },
                          { name: '알루미늄 (Al)', value: 580, unit: 'kg', max: 800, color: 'bg-blue-400', textColor: 'text-blue-700' },
                          { name: '철 (Fe)', value: 128, unit: 'kg', max: 300, color: 'bg-slate-500', textColor: 'text-slate-700' },
                          { name: '희토류', value: 15, unit: 'g', max: 30, color: 'bg-purple-400', textColor: 'text-purple-700' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-600 w-28">{item.name}</span>
                            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full", item.color)} style={{ width: `${(item.value / item.max) * 100}%` }} />
                            </div>
                            <span className={cn("text-sm font-black w-20 text-right", item.textColor)}>{item.value}{item.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {circSelectedStat === 'lifespan' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lifeExtensionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 4]} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                        <Line type="monotone" dataKey="years" name="추가 사용 연수" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5, fill: '#8b5cf6' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* ESG 성과 리포트 - emitter, processor 역할에만 노출 */}
            {(userRole === 'emitter' || userRole === 'processor') && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">ESG 성과 리포트</h3>
                      <p className="text-xs text-slate-500">자원순환 활동에 따른 ESG 성과를 요약합니다.</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold text-emerald-600">Environmental</span>
                      <p className="text-2xl font-black text-emerald-700">{circTotalCo2 > 1000 ? `${(circTotalCo2 / 1000).toFixed(1)}t` : `${circTotalCo2}kg`}</p>
                      <p className="text-xs text-emerald-600">CO₂e 탄소 절감량</p>
                      <div className="pt-2 border-t border-emerald-200 text-xs text-emerald-700">
                        <p>자원순환율 {circCirculationRate}% 달성</p>
                        <p>매립 회피 자산 {circTotalReuse + circTotalRecycle}건</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold text-blue-600">Social</span>
                      <p className="text-2xl font-black text-blue-700">{circTotalReuse}건</p>
                      <p className="text-xs text-blue-600">재사용 기기 (디지털 격차 해소)</p>
                      <div className="pt-2 border-t border-blue-200 text-xs text-blue-700">
                        <p>데이터 폐기 인증 100%</p>
                        <p>정보보안 가이드라인 준수</p>
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold text-indigo-600">Governance</span>
                      <p className="text-2xl font-black text-indigo-700">{circTotalAssets}건</p>
                      <p className="text-xs text-indigo-600">투명한 자산 처리 이력</p>
                      <div className="pt-2 border-t border-indigo-200 text-xs text-indigo-700">
                        <p>블록체인 기반 이력 추적</p>
                        <p>올바로 시스템 연동 완료</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" /> ESG 리포트 다운로드 (PDF)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );
      case 'allbaro':
        {
          const allbaroSampleData = [
            { no: 1, requestNo: 'REQ-2026-0312', manifestNo: 'MF-2026-0401', receiveDate: '2026-03-20', handoverPerson: '김인수', wasteType: '폐전자제품(대형)', emitter: '삼성전자 수원사업장', emitterHandoverDate: '2026-03-18', entrustQty: '1,200 kg', receiveQty: '1,200 kg', vehicleNo: '서울 12가 3456', storageType: '자가보관', tempStorage: '인천 서구 임시보관소', handoverDate: '2026-03-22', status: '올바로전송완료' as const, emitterCompany: '삼성전자' },
            { no: 2, requestNo: 'REQ-2026-0315', manifestNo: 'MF-2026-0405', receiveDate: '2026-03-21', handoverPerson: '김인수', wasteType: '폐저장매체', emitter: 'LG전자 평택공장', emitterHandoverDate: '2026-03-19', entrustQty: '350 kg', receiveQty: '350 kg', vehicleNo: '경기 34나 5678', storageType: '위탁보관', tempStorage: '화성 동탄 보관소', handoverDate: '2026-03-23', status: '올바로전송대기' as const, emitterCompany: 'LG전자' },
            { no: 3, requestNo: 'REQ-2026-0318', manifestNo: 'MF-2026-0410', receiveDate: '2026-03-22', handoverPerson: '김인수', wasteType: '폐통신기기', emitter: 'SK하이닉스 이천캠퍼스', emitterHandoverDate: '2026-03-20', entrustQty: '800 kg', receiveQty: '800 kg', vehicleNo: '인천 56다 7890', storageType: '자가보관', tempStorage: '이천 부발 보관소', handoverDate: '2026-03-24', status: '올바로전송완료' as const, emitterCompany: 'SK하이닉스' },
            { no: 4, requestNo: 'REQ-2026-0320', manifestNo: 'MF-2026-0415', receiveDate: '2026-03-23', handoverPerson: '김인수', wasteType: '폐전자제품(소형)', emitter: '현대오토에버 본사', emitterHandoverDate: '2026-03-21', entrustQty: '500 kg', receiveQty: '500 kg', vehicleNo: '서울 78라 1234', storageType: '위탁보관', tempStorage: '성남 분당 보관소', handoverDate: '', status: '올바로전송대기' as const, emitterCompany: '현대오토에버' },
            { no: 5, requestNo: 'REQ-2026-0322', manifestNo: 'MF-2026-0420', receiveDate: '2026-03-24', handoverPerson: '김인수', wasteType: '폐영상표시장치', emitter: '삼성전자 수원사업장', emitterHandoverDate: '2026-03-22', entrustQty: '650 kg', receiveQty: '650 kg', vehicleNo: '경기 90마 5678', storageType: '자가보관', tempStorage: '수원 영통 보관소', handoverDate: '2026-03-26', status: '올바로전송완료' as const, emitterCompany: '삼성전자' },
            { no: 6, requestNo: 'REQ-2026-0325', manifestNo: 'MF-2026-0425', receiveDate: '2026-03-25', handoverPerson: '김인수', wasteType: '폐전자제품(대형)', emitter: 'LG전자 평택공장', emitterHandoverDate: '2026-03-23', entrustQty: '900 kg', receiveQty: '900 kg', vehicleNo: '서울 12가 3456', storageType: '위탁보관', tempStorage: '평택 청북 보관소', handoverDate: '', status: '올바로전송대기' as const, emitterCompany: 'LG전자' },
          ];

          const filteredAllbaroData = (userRole === 'emitter' || userRole === 'transporter')
            ? allbaroSampleData.filter(d => d.emitterCompany === '삼성전자')
            : allbaroSampleData;

          const allbaroTotalCount = filteredAllbaroData.length;
          const allbaroPendingCount = filteredAllbaroData.filter(d => d.status === '올바로전송대기').length;
          const allbaroCompleteCount = filteredAllbaroData.filter(d => d.status === '올바로전송완료').length;

          const allbaroDescription = (userRole === 'emitter' || userRole === 'transporter')
            ? '내 배출건별 올바로연동 현황조회'
            : '전체 배출건별 올바로연동 현황조회';

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 pb-20"
            >
              {/* 헤더 */}
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <Link2 className="w-8 h-8 text-teal-600" />
                  올바로 연동
                </h1>
                <p className="text-slate-500 mt-1">{allbaroDescription}</p>
              </div>

              {/* 상단 요약 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: '전체 건수', value: allbaroTotalCount, sub: '건', icon: FileText, color: 'slate' },
                  { label: '올바로전송대기', value: allbaroPendingCount, sub: '건', icon: Clock, color: 'amber' },
                  { label: '올바로전송완료', value: allbaroCompleteCount, sub: '건', icon: CheckCircle2, color: 'emerald' },
                ].map((card, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center",
                        card.color === 'amber' ? "bg-amber-50 text-amber-600" :
                        card.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                        "bg-slate-50 text-slate-600"
                      )}>
                        <card.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-500">{card.label}</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">{card.value}<span className="text-sm font-bold text-slate-400 ml-1">{card.sub}</span></p>
                  </div>
                ))}
              </div>

              {/* 메인 테이블 */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-700">연동 현황</span>
                    <span className="text-xs text-slate-400">{filteredAllbaroData.length}건</span>
                  </div>
                  <button
                    onClick={() => {
                      const pending = filteredAllbaroData.filter(d => d.status === '올바로전송대기').length;
                      if (pending === 0) {
                        alert('전송 대기 건이 없습니다.');
                      } else {
                        alert(`${pending}건을 올바로 시스템에 전송합니다.`);
                      }
                    }}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    올바로전송
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-center px-3 py-3 font-bold text-slate-600 whitespace-nowrap">순번</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">신청번호</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">인계서번호</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">인수일자</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">폐기물종류</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">배출자</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">배출자인계일자</th>
                        <th className="text-right px-3 py-3 font-bold text-slate-600 whitespace-nowrap">위탁량</th>
                        <th className="text-right px-3 py-3 font-bold text-slate-600 whitespace-nowrap">인수량</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">차량번호</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">보관장소유형</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">임시보관장소</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">인계일자</th>
                        <th className="text-left px-3 py-3 font-bold text-slate-600 whitespace-nowrap">인계자명</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAllbaroData.map((row, idx) => (
                        <tr key={row.no} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="text-center px-3 py-3 text-slate-500">{idx + 1}</td>
                          <td className="px-3 py-3">
                            <span className="font-bold text-teal-700">{row.requestNo}</span>
                          </td>
                          <td className="px-3 py-3 font-mono text-xs text-slate-600">{row.manifestNo}</td>
                          <td className="px-3 py-3 text-slate-600">{row.receiveDate}</td>
                          <td className="px-3 py-3 text-slate-700 font-bold text-xs">{row.wasteType}</td>
                          <td className="px-3 py-3">
                            <span className="font-bold text-slate-700 text-xs">{row.emitter}</span>
                          </td>
                          <td className="px-3 py-3 text-slate-600">{row.emitterHandoverDate}</td>
                          <td className="px-3 py-3 text-right text-slate-700 font-bold">{row.entrustQty}</td>
                          <td className="px-3 py-3 text-right text-slate-700 font-bold">{row.receiveQty}</td>
                          <td className="px-3 py-3 text-slate-600 font-mono text-xs">{row.vehicleNo}</td>
                          <td className="px-3 py-3 text-slate-600 text-xs">{row.storageType}</td>
                          <td className="px-3 py-3 text-slate-600 text-xs">{row.tempStorage}</td>
                          <td className="px-3 py-3 text-slate-600">{row.handoverDate || '—'}</td>
                          <td className="px-3 py-3 text-slate-700 text-xs font-bold">{row.handoverPerson}</td>
                          <td className="px-3 py-3 text-center">
                            <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap",
                              row.status === '올바로전송대기' ? "bg-amber-100 text-amber-700" :
                              "bg-emerald-100 text-emerald-700"
                            )}>{row.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          );
        }

      case 'info': {
        const infoTabs = userRole === 'transporter'
          ? ['회사정보', '방문지정보', '차량정보', '기사정보']
          : userRole === 'processor'
          ? ['회사정보', '검수 담당자', '데이터삭제 담당자', '분배 담당자']
          : ['회사정보'];

        // infoTab state is declared at component top level

        const companyInfo = {
          name: userCompany,
          bizNo: '123-45-67890',
          representative: '김대표',
          address: '서울특별시 강남구 테헤란로 521',
          contact: '02-1234-5678',
          manager: '박담당',
          managerEmail: 'manager@company.co.kr',
          managerPhone: '010-1234-5678',
          taxEmail: 'tax@company.co.kr',
        };

        const visitSites = [
          { id: 1, company: '삼성전자', address: '경기도 수원시 영통구 삼성로 129', contact: '이수거', phone: '010-1111-2222', note: '정문 출입' },
          { id: 2, company: 'LG전자', address: '서울특별시 영등포구 여의대로 128', contact: '김수거', phone: '010-3333-4444', note: '지하주차장' },
          { id: 3, company: '현대모비스', address: '서울특별시 강남구 테헤란로 33', contact: '박수거', phone: '010-5555-6666', note: '후문 이용' },
        ];

        const vehicles = [
          { id: 1, number: '서울 12가 3456', type: '1톤 탑차', gps: true, status: '운행중' },
          { id: 2, number: '경기 34나 7890', type: '2.5톤 윙바디', gps: true, status: '대기' },
          { id: 3, number: '서울 56다 1234', type: '5톤 탑차', gps: true, status: '정비중' },
        ];

        const drivers = [
          { id: 1, name: '박운송', phone: '010-1234-5678', license: '1종대형', securityCert: true, status: '근무중' },
          { id: 2, name: '김기사', phone: '010-2345-6789', license: '1종대형', securityCert: true, status: '근무중' },
          { id: 3, name: '이운전', phone: '010-3456-7890', license: '1종보통', securityCert: false, status: '휴가' },
        ];

        const staffList = [
          { id: 1, name: '정검수', phone: '010-1111-1111', role: '검수', cert: 'ITAD 검수사 1급', status: '근무중' },
          { id: 2, name: '한삭제', phone: '010-2222-2222', role: '데이터삭제', cert: 'NIST 인증', status: '근무중' },
          { id: 3, name: '윤분해', phone: '010-3333-3333', role: '분배', cert: '자원순환 기사', status: '근무중' },
        ];

        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pb-20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-indigo-600" />
                  정보관리
                </h1>
                <p className="text-slate-500 mt-1">회사 및 운영 정보를 관리합니다.</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
              {infoTabs.map(tab => (
                <button key={tab} onClick={() => setInfoTab(tab)} className={cn("px-5 py-2 rounded-xl text-sm font-bold transition-all", infoTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}>{tab}</button>
              ))}
            </div>

            {/* 회사정보 */}
            {infoTab === '회사정보' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">기본 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: '회사명', value: companyInfo.name },
                      { label: '사업자등록번호', value: companyInfo.bizNo },
                      { label: '대표자', value: companyInfo.representative },
                      { label: '주소', value: companyInfo.address },
                      { label: '대표전화', value: companyInfo.contact },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">{item.label}</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" defaultValue={item.value} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">담당자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: '담당자명', value: companyInfo.manager },
                      { label: '이메일', value: companyInfo.managerEmail },
                      { label: '연락처', value: companyInfo.managerPhone },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">{item.label}</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" defaultValue={item.value} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">세금계산서 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">세금계산서 수신 이메일</label>
                      <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" defaultValue={companyInfo.taxEmail} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end"><button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">저장</button></div>
              </div>
            )}

            {/* 방문지정보 (운송회사) */}
            {infoTab === '방문지정보' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">배출처 수거지 목록</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl">+ 등록</button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>{['배출처', '주소', '담당자', '연락처', '비고', '관리'].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visitSites.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{s.company}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{s.address}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{s.contact}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{s.phone}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{s.note}</td>
                        <td className="px-6 py-4 flex gap-2"><button className="text-xs text-indigo-600 font-bold">수정</button><button className="text-xs text-rose-500 font-bold">삭제</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 차량정보 (운송회사) */}
            {infoTab === '차량정보' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">차량 목록</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl">+ 등록</button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>{['차량번호', '차종', 'GPS 장착', '상태', '관리'].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vehicles.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{v.number}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{v.type}</td>
                        <td className="px-6 py-4"><span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", v.gps ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>{v.gps ? '장착' : '미장착'}</span></td>
                        <td className="px-6 py-4"><span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", v.status === '운행중' ? "bg-indigo-100 text-indigo-700" : v.status === '대기' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{v.status}</span></td>
                        <td className="px-6 py-4 flex gap-2"><button className="text-xs text-indigo-600 font-bold">수정</button><button className="text-xs text-rose-500 font-bold">삭제</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 기사정보 (운송회사) */}
            {infoTab === '기사정보' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">운전기사 목록</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl">+ 등록</button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>{['이름', '연락처', '면허', '보안인증', '상태', '관리'].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {drivers.map(d => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{d.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{d.phone}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{d.license}</td>
                        <td className="px-6 py-4"><span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", d.securityCert ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600")}>{d.securityCert ? '완료' : '미완료'}</span></td>
                        <td className="px-6 py-4"><span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", d.status === '근무중' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>{d.status}</span></td>
                        <td className="px-6 py-4 flex gap-2"><button className="text-xs text-indigo-600 font-bold">수정</button><button className="text-xs text-rose-500 font-bold">삭제</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 담당자 탭 (처리사) */}
            {['검수 담당자', '데이터삭제 담당자', '분배 담당자'].includes(infoTab) && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{infoTab} 목록</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl">+ 등록</button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>{['이름', '연락처', '담당업무', '자격/인증', '상태', '관리'].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {staffList.filter(s => infoTab.includes(s.role)).map(s => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{s.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{s.phone}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{s.role}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{s.cert}</td>
                        <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-700">{s.status}</span></td>
                        <td className="px-6 py-4 flex gap-2"><button className="text-xs text-indigo-600 font-bold">수정</button><button className="text-xs text-rose-500 font-bold">삭제</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        );
      }

      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900">시스템 관리</h1>
              <p className="text-slate-500 mt-1">사용자 권한, 알림 설정 및 플랫폼 환경을 관리합니다.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">계정 설정</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">프로필 정보</p>
                    <p className="text-sm text-slate-500">이름, 이메일 및 소속 정보를 변경합니다.</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">수정</button>
                </div>
                <div className="h-[1px] bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">보안 및 비밀번호</p>
                    <p className="text-sm text-slate-500">2단계 인증 및 비밀번호를 관리합니다.</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">관리</button>
                </div>
                <div className="h-[1px] bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">알림 설정</p>
                    <p className="text-sm text-slate-500">이메일 및 카카오 알림톡 수신 여부를 설정합니다.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">권한 관리 (Admin Only)</h3>
              </div>
              <div className="p-6">
                <table className="w-full text-left">
                  <thead className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="pb-4">사용자</th>
                      <th className="pb-4">부서</th>
                      <th className="pb-4">권한</th>
                      <th className="pb-4">상태</th>
                      <th className="pb-4 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: '홍길동', dept: 'IT전략팀', role: 'Master', status: '활성' },
                      { name: '김철수', dept: '보안운영팀', role: 'Operator', status: '활성' },
                      { name: '이영희', dept: '총무팀', role: 'Viewer', status: '비활성' },
                    ].map((user, i) => (
                      <tr key={i} className="text-sm">
                        <td className="py-4 font-bold text-slate-900">{user.name}</td>
                        <td className="py-4 text-slate-600">{user.dept}</td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">{user.role}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", user.status === '활성' ? "bg-emerald-500" : "bg-slate-300")}></div>
                            <span className="text-slate-600">{user.status}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-slate-400 hover:text-slate-600">
                            <Settings className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Settings className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">준비 중인 서비스입니다.</p>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tighter text-slate-900">K-ITAD</span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">ITAD란?</a>
              <a href="#process" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">서비스 프로세스</a>
              <a href="#reports" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">리포트센터</a>
              <a href="#board" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">고객지원</a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open('/transport-app.html', '_blank')}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/10 flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                앱 확인하기
              </button>
              <button
                onClick={() => setShowRoleSelect(true)}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
              >
                플랫폼 로그인
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                <span className="block whitespace-nowrap">IT 자산의 <span className="text-emerald-500">완벽한</span> 데이터 파기와</span>
                <span className="block whitespace-nowrap">투명한 자원 순환 관리까지</span>
              </h1>
              <p className="text-lg text-slate-500 mt-8 leading-relaxed max-w-3xl">
                배출 신청부터 보안 운송, 데이터 완전 파기, 그리고 자원 순환까지.<br />
                K-ITAD는 기업의 IT 자산을 ESG 가치로 전환합니다.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => setShowRoleSelect(true)}
                  className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2 group"
                >
                  시작하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  서비스 소개서 다운로드
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[40px] overflow-hidden relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] group">
                {/* 데이터센터 + 자원순환 SVG 일러스트 */}
                <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 배경 그라디언트 */}
                  <defs>
                    <linearGradient id="bgGrad" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="50%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="serverGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <linearGradient id="glowGreen" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="recycleGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* 배경 */}
                  <rect width="800" height="600" fill="url(#bgGrad)" />

                  {/* 배경 그리드 패턴 */}
                  <g opacity="0.06">
                    {Array.from({length: 20}).map((_, i) => (
                      <line key={`vg${i}`} x1={i * 40} y1="0" x2={i * 40} y2="600" stroke="#94a3b8" strokeWidth="1" />
                    ))}
                    {Array.from({length: 15}).map((_, i) => (
                      <line key={`hg${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="#94a3b8" strokeWidth="1" />
                    ))}
                  </g>

                  {/* 바닥면 (원근감) */}
                  <path d="M 0 600 L 0 420 L 800 420 L 800 600 Z" fill="#0c1222" opacity="0.5" />
                  <path d="M 0 420 L 400 360 L 800 420" stroke="#1e293b" strokeWidth="1" fill="none" opacity="0.5" />

                  {/* ===== 왼쪽: 서버 랙 3개 ===== */}
                  {[140, 260, 380].map((x, ri) => (
                    <g key={`rack-${ri}`}>
                      {/* 랙 몸체 */}
                      <rect x={x} y="140" width="80" height="280" rx="6" fill="url(#serverGrad)" stroke="#475569" strokeWidth="1.5" />
                      {/* 서버 유닛들 */}
                      {Array.from({length: 8}).map((_, si) => {
                        const sy = 152 + si * 32;
                        const isActive = (ri + si) % 3 !== 0;
                        return (
                          <g key={`unit-${ri}-${si}`}>
                            <rect x={x + 8} y={sy} width="64" height="24" rx="3" fill={isActive ? "#1e293b" : "#263043"} stroke="#475569" strokeWidth="0.5" />
                            {/* LED 점등 */}
                            <circle cx={x + 18} cy={sy + 12} r="2.5" fill={isActive ? "#10b981" : "#475569"}>
                              {isActive && <animate attributeName="opacity" values="1;0.4;1" dur={`${1.5 + ri * 0.3}s`} repeatCount="indefinite" />}
                            </circle>
                            <circle cx={x + 28} cy={sy + 12} r="2.5" fill={isActive ? "#10b981" : "#475569"}>
                              {isActive && <animate attributeName="opacity" values="1;0.5;1" dur={`${2 + si * 0.2}s`} repeatCount="indefinite" />}
                            </circle>
                            {/* 디스크 슬롯 라인 */}
                            <rect x={x + 38} y={sy + 5} width="28" height="2" rx="1" fill="#475569" opacity="0.5" />
                            <rect x={x + 38} y={sy + 10} width="28" height="2" rx="1" fill="#475569" opacity="0.5" />
                            <rect x={x + 38} y={sy + 15} width="28" height="2" rx="1" fill="#475569" opacity="0.5" />
                          </g>
                        );
                      })}
                      {/* 랙 라벨 */}
                      <text x={x + 40} y="436" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">RACK-0{ri + 1}</text>
                    </g>
                  ))}

                  {/* ===== 중앙: 순환 화살표 (자원순환 심볼) ===== */}
                  <g transform="translate(560, 220)">
                    {/* 외곽 원형 글로우 */}
                    <circle cx="100" cy="100" r="95" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.15">
                      <animate attributeName="r" values="90;100;90" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.1" />

                    {/* 순환 화살표 3개 (120도 간격) */}
                    {[0, 120, 240].map((angle, ai) => (
                      <g key={`arrow-${ai}`} transform={`rotate(${angle}, 100, 100)`}>
                        <path
                          d="M 100 30 A 70 70 0 0 1 160.6 65"
                          stroke="url(#recycleGrad)" strokeWidth="6" fill="none" strokeLinecap="round"
                          filter="url(#glow)"
                        >
                          <animate attributeName="stroke-dasharray" values="0,200;100,200" dur="3s" begin={`${ai * 1}s`} repeatCount="indefinite" />
                        </path>
                        {/* 화살촉 */}
                        <polygon
                          points="164,58 155,72 170,70"
                          fill="#10b981" opacity="0.9"
                        >
                          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" begin={`${ai * 1}s`} repeatCount="indefinite" />
                        </polygon>
                      </g>
                    ))}

                    {/* 중앙 아이콘 */}
                    <circle cx="100" cy="100" r="28" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="100" y="95" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">♻</text>
                    <text x="100" y="112" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">ITAD</text>
                  </g>

                  {/* ===== 데이터 흐름 라인 (서버 → 순환) ===== */}
                  <g filter="url(#glow)">
                    <path d="M 460 230 C 490 230, 510 240, 540 250" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="6,4" opacity="0.6">
                      <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M 460 280 C 490 280, 520 290, 560 300" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="6,4" opacity="0.6">
                      <animate attributeName="stroke-dashoffset" values="0;-20" dur="2.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M 460 330 C 490 340, 530 350, 560 350" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="6,4" opacity="0.6">
                      <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.8s" repeatCount="indefinite" />
                    </path>
                  </g>

                  {/* ===== 플로팅 데이터 노드들 ===== */}
                  {[
                    { cx: 500, cy: 160, label: 'HDD', delay: '0s' },
                    { cx: 520, cy: 400, label: 'SSD', delay: '1s' },
                    { cx: 720, cy: 140, label: 'Au', delay: '0.5s' },
                    { cx: 740, cy: 420, label: 'Cu', delay: '1.5s' },
                  ].map((node, ni) => (
                    <g key={`node-${ni}`}>
                      <circle cx={node.cx} cy={node.cy} r="16" fill="#1e293b" stroke="#334155" strokeWidth="1">
                        <animate attributeName="cy" values={`${node.cy};${node.cy - 8};${node.cy}`} dur="4s" begin={node.delay} repeatCount="indefinite" />
                      </circle>
                      <text x={node.cx} y={node.cy + 4} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
                        {node.label}
                        <animate attributeName="y" values={`${node.cy + 4};${node.cy - 4};${node.cy + 4}`} dur="4s" begin={node.delay} repeatCount="indefinite" />
                      </text>
                    </g>
                  ))}

                  {/* ===== 하단: 통계 바 ===== */}
                  <g transform="translate(120, 470)">
                    <rect width="560" height="70" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                    {[
                      { label: '재활용률', value: '96.3%', color: '#10b981', barW: 130 },
                      { label: '탄소 절감', value: '9.8톤', color: '#06b6d4', barW: 105 },
                      { label: '데이터 파기', value: '100%', color: '#8b5cf6', barW: 140 },
                      { label: '보안 운송', value: '정상', color: '#f59e0b', barW: 90 },
                    ].map((stat, si) => {
                      const sx = 20 + si * 140;
                      return (
                        <g key={`stat-${si}`}>
                          <text x={sx} y="25" fill="#64748b" fontSize="10" fontWeight="bold">{stat.label}</text>
                          <text x={sx} y="45" fill="#f8fafc" fontSize="16" fontWeight="bold">{stat.value}</text>
                          <rect x={sx} y="54" width={stat.barW * 0.7} height="3" rx="1.5" fill={stat.color} opacity="0.6">
                            <animate attributeName="width" values={`0;${stat.barW * 0.7}`} dur="1.5s" begin={`${si * 0.3}s`} fill="freeze" />
                          </rect>
                        </g>
                      );
                    })}
                  </g>

                  {/* ===== 상단 장식: 보안 뱃지 ===== */}
                  <g transform="translate(560, 60)">
                    <rect width="200" height="50" rx="25" fill="#10b981" opacity="0.15" />
                    <rect width="200" height="50" rx="25" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
                    <circle cx="28" cy="25" r="14" fill="#10b981" opacity="0.3" />
                    <text x="26" y="29" textAnchor="middle" fill="#ffffff" fontSize="12">🔒</text>
                    <text x="110" y="22" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">NIST 800-88</text>
                    <text x="110" y="36" textAnchor="middle" fill="#6ee7b7" fontSize="8">Certified Secure</text>
                  </g>

                  {/* 미세 파티클 */}
                  {Array.from({length: 12}).map((_, pi) => (
                    <circle key={`p-${pi}`} cx={80 + pi * 60} cy={100 + (pi % 4) * 120} r="1.5" fill="#10b981" opacity="0.3">
                      <animate attributeName="cy" values={`${100 + (pi % 4) * 120};${80 + (pi % 4) * 120};${100 + (pi % 4) * 120}`} dur={`${3 + pi * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${2 + pi * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>

                {/* Floating Security Badge */}
              </div>

              {/* Background Glow */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[120px] rounded-full"></div>
            </motion.div>

          </div>
        </section>

        {/* What is ITAD? */}
        <section id="about" className="py-32 bg-slate-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-6">ITAD란?</h2>
              <p className="text-emerald-600 font-bold text-xl mb-4">IT Asset Disposition — IT 자산 처분의 전 과정을 뜻합니다.</p>
              <p className="text-slate-600 text-lg leading-relaxed">
                기업이 더 이상 쓰지 않는 PC, 서버, 모바일 기기 등을 안전하게 회수하고, 데이터를 완전 삭제한 뒤, 재활용·재판매·폐기까지 처리하는 일련의 프로세스입니다.
              </p>
              <div className="mt-8 inline-block px-5 py-2 bg-slate-200 rounded-full text-lg font-bold text-slate-700">
                ITAD의 3대 핵심 가치
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: ShieldCheck, 
                  title: '데이터 보안', 
                  desc: '장비 안의 민감 정보가 외부에 유출되지 않도록 인증 기준에 따라 완전히 파괴합니다.',
                  color: 'bg-blue-500'
                },
                { 
                  icon: Leaf, 
                  title: '환경 규제 준수(ESG)', 
                  desc: '전자폐기물을 무단 매립하지 않고, 법적·환경적 기준에 맞게 처리합니다.',
                  color: 'bg-emerald-500'
                },
                { 
                  icon: BarChart3, 
                  title: '잔존 가치 회수', 
                  desc: '쓸모없어 보이는 장비에서도 부품·소재·리퍼 판매를 통해 경제적 가치를 되찾습니다.',
                  color: 'bg-indigo-500'
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg", item.color)}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  배출신청부터 자원순환 관리까지.<br />
                  <span className="text-emerald-500">투명한 5단계 통합 프로세스</span>
                </h2>
                <p className="text-slate-500 mt-6 text-lg leading-relaxed">
                  K-ITAD는 자산의 배출부터 최종 처리까지 모든 과정을 실시간으로 추적합니다. 
                  각 단계별로 생성되는 데이터는 위/변조가 불가능합니다.
                </p>
                
                <div className="mt-12 space-y-8">
                  {[
                    { 
                      step: '01', 
                      title: '배출 신청', 
                      desc: '처분할 장비를 등록하세요. 프로세스가 시작됩니다.',
                      details: '기업이 처분 대상 장비(모델, 수량, 상태)를 입력하는 시작점 / 엑셀 일괄 업로드 / 바코드 스캔 지원'
                    },
                    { 
                      step: '02', 
                      title: '보안 운송', 
                      desc: '수거 일정부터 물류 추적까지, 실시간으로.',
                      details: '수거 일정 조율, 차량 배정, 실시간 운송 추적 / 인수인계 서명 및 사진 증빙'
                    },
                    { 
                      step: '03', 
                      title: '데이터 삭제 · 인증', 
                      desc: '완전한 데이터 파괴, 인증서로 증명합니다.',
                      details: 'NIST 800-88 / DoD 5220.22-M 기준 삭제 이력 / 건별 데이터 삭제 인증서(CoD) 자동 발급'
                    },
                    { 
                      step: '04', 
                      title: '재사용 · 재활용', 
                      desc: '자산의 가치를 극대화하고 환경을 보호합니다.',
                      details: '자산별 최적 처리 방식(리퍼·재판매·부품회수) 결정 / 친환경 재활용 공정 진행'
                    },
                    { 
                      step: '05', 
                      title: '재 자원화 · 리포트', 
                      desc: '모든 결과를 리포트로 확인하세요.',
                      details: '최종 처리 결과 기록 / ESG 환경 리포트(탄소 절감량, 매립 회피량) 자동 생성'
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <span className="text-emerald-500 font-bold text-xl">{item.step}</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                        <p className="text-slate-700 font-medium text-sm mt-1">{item.desc}</p>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 flex items-center justify-center py-12">
                <div className="relative w-full max-w-[600px] aspect-square">
                  {/* Central Node */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-40 h-40 bg-slate-900 rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-emerald-500/20"
                    >
                      <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">K-ITAD</span>
                      <span className="text-lg font-bold">선순환 구조</span>
                    </motion.div>
                  </div>

                  {/* Circular Path SVG */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="38" 
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="0.5" 
                      strokeDasharray="4 4"
                      className="opacity-20"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#064e3b" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Nodes */}
                  {[
                    { icon: Monitor, label: '배출 신청', angle: 0, color: 'bg-slate-100 text-slate-600' },
                    { icon: Truck, label: '보안 운송', angle: 72, color: 'bg-slate-100 text-slate-600' },
                    { icon: ShieldCheck, label: '데이터 삭제', angle: 144, color: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' },
                    { icon: Recycle, label: '재사용 · 재활용', angle: 216, color: 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' },
                    { icon: Leaf, label: '재 자원화', angle: 288, color: 'bg-emerald-100 text-emerald-600' },
                  ].map((node, i) => {
                    const radius = 38; // percentage of container
                    const x = 50 + radius * Math.cos((node.angle - 90) * (Math.PI / 180));
                    const y = 50 + radius * Math.sin((node.angle - 90) * (Math.PI / 180));
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="absolute w-28 h-28 -ml-14 -mt-14 flex flex-col items-center justify-center z-20"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <div className={cn("w-20 h-20 rounded-[24px] flex items-center justify-center mb-3 transition-transform hover:scale-110 cursor-default", node.color)}>
                          <node.icon className="w-10 h-10" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{node.label}</span>
                      </motion.div>
                    );
                  })}

                  {/* Connecting Arrows (Animated) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    {[0, 72, 144, 216, 288].map((angle, i) => {
                      const startAngle = angle - 90 + 18;
                      const endAngle = angle - 90 + 72 - 18;
                      const radius = 38;
                      
                      const startX = 50 + radius * Math.cos(startAngle * (Math.PI / 180));
                      const startY = 50 + radius * Math.sin(startAngle * (Math.PI / 180));
                      const endX = 50 + radius * Math.cos(endAngle * (Math.PI / 180));
                      const endY = 50 + radius * Math.sin(endAngle * (Math.PI / 180));
                      
                      return (
                        <motion.path
                          key={i}
                          d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.4 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Center Section */}
        <section id="reports" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-6">리포트센터</h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                K-ITAD 플랫폼은 투명한 자산 처리를 위해 다양한 리포트와 증명서를 실시간으로 제공합니다.<br />
                표준화된 양식의 샘플 리포트를 확인해 보세요.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'ESG 성과 리포트',
                  desc: '탄소 저감량 및 매립 회피량 등 환경 기여도를 수치화하여 제공합니다.',
                  icon: Leaf,
                  color: 'bg-emerald-500'
                },
                {
                  title: '자산 폐기 증명서',
                  desc: '데이터 완전 파기 및 물리적 폐기 공정이 완료되었음을 공식 증명합니다.',
                  icon: ShieldCheck,
                  color: 'bg-blue-500'
                },
                {
                  title: 'IT자산 인벤토리 현황',
                  desc: '배출된 모든 자산의 모델명, S/N, 사양 및 처리 상태를 상세 관리합니다.',
                  icon: ClipboardList,
                  color: 'bg-indigo-500'
                },
                {
                  title: '연간 자원 순환 통계',
                  desc: '연간 자산 처리 트렌드와 자원 재활용률 통계 분석 리포트입니다.',
                  icon: BarChart3,
                  color: 'bg-amber-500'
                }
              ].map((report, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg", report.color)}>
                    <report.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{report.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{report.desc}</p>
                  <button 
                    onClick={() => setSelectedSample(report.title)}
                    className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    샘플보기
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Support Section */}
        <section id="board" className="py-32 bg-slate-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">고객지원</h2>
              <p className="text-slate-500 mt-4">K-ITAD는 고객님의 원활한 서비스 이용을 위해 최선을 다하고 있습니다.</p>
            </div>

            <div className="flex justify-center mb-12">
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex gap-2 shadow-sm">
                {[
                  { id: 'board', label: '고객문의 게시판' },
                  { id: 'faq', label: '자주하는질문' },
                  { id: 'resources', label: '통합자료실' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSupportTab(tab.id)}
                    className={cn(
                      "px-8 py-3 rounded-xl font-bold text-sm transition-all",
                      supportTab === tab.id 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                        : "text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {supportTab === 'board' && (
                <motion.div
                  key="board"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">고객문의 게시판</h3>
                      <p className="text-slate-500 mt-2">K-ITAD 서비스에 대해 궁금한 점을 남겨주세요.</p>
                    </div>
                    <button onClick={() => setShowInquiryModal(true)} className="bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      문의하기
                    </button>
                  </div>

                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">번호</th>
                          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">제목</th>
                          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">작성자</th>
                          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">날짜</th>
                          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">상태</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {inquiryBoard.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                            <td className="px-8 py-6 text-sm text-slate-400">{item.id}</td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{item.title}</span>
                                <Lock className="w-3 h-3 text-slate-300" />
                              </div>
                            </td>
                            <td className="px-8 py-6 text-sm text-slate-600">{item.author}</td>
                            <td className="px-8 py-6 text-sm text-slate-400">{item.date}</td>
                            <td className="px-8 py-6 text-center">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                item.status === '답변완료' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                              )}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-8 border-t border-slate-50 flex justify-center">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(p => (
                          <button key={p} className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                            p === 1 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-slate-400 hover:bg-slate-50"
                          )}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {supportTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">자주하는질문</h3>
                    <p className="text-slate-500 mt-2">가장 자주 묻는 질문들에 대한 답변입니다.</p>
                  </div>
                  {faqData.map((item) => (
                    <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                      <div className="flex gap-4">
                        <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold shrink-0">Q</span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg mb-4">{item.question}</h4>
                          <div className="flex gap-4">
                            <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center font-bold shrink-0">A</span>
                            <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {supportTab === 'resources' && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">통합자료실</h3>
                    <p className="text-slate-500 mt-2">서비스 이용에 필요한 각종 가이드와 리포트를 다운로드하세요.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {resourceData.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                              <p className="text-slate-400 text-xs">{item.date} • {item.size} • {item.type}</p>
                            </div>
                          </div>
                          <button className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 문의하기 팝업 */}
        <AnimatePresence>
          {showInquiryModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setShowInquiryModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* 모달 헤더 */}
                <div className="sticky top-0 bg-white border-b border-slate-100 p-6 rounded-t-3xl flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">문의하기</h3>
                      <p className="text-sm text-slate-400">K-ITAD 서비스에 대해 궁금한 점을 남겨주세요.</p>
                    </div>
                  </div>
                  <button onClick={() => setShowInquiryModal(false)} className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* 모달 폼 */}
                <div className="p-6 space-y-5">
                  {/* 문의 유형 */}
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block">문의 유형</label>
                    <div className="flex flex-wrap gap-2">
                      {['서비스 문의', '견적 요청', '기술 문의', '제휴/파트너십', '기타'].map(cat => (
                        <button key={cat} onClick={() => setInquiryForm({ ...inquiryForm, category: cat })}
                          className={cn("px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                            inquiryForm.category === cat
                              ? "bg-emerald-500 text-white border-emerald-500"
                              : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
                          )}>{cat}</button>
                      ))}
                    </div>
                  </div>

                  {/* 제목 */}
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block">제목 <span className="text-rose-500">*</span></label>
                    <input value={inquiryForm.title} onChange={e => setInquiryForm({ ...inquiryForm, title: e.target.value })}
                      placeholder="문의 제목을 입력해 주세요"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                  </div>

                  {/* 기업명 / 이름 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">기업명 <span className="text-rose-500">*</span></label>
                      <input value={inquiryForm.company} onChange={e => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                        placeholder="기업명"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">담당자명 <span className="text-rose-500">*</span></label>
                      <input value={inquiryForm.name} onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="성함"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                    </div>
                  </div>

                  {/* 이메일 / 연락처 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">이메일 <span className="text-rose-500">*</span></label>
                      <input value={inquiryForm.email} onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        type="email" placeholder="example@company.com"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">연락처</label>
                      <input value={inquiryForm.phone} onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                    </div>
                  </div>

                  {/* 문의 내용 */}
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block">문의 내용 <span className="text-rose-500">*</span></label>
                    <textarea value={inquiryForm.content} onChange={e => setInquiryForm({ ...inquiryForm, content: e.target.value })}
                      rows={5} placeholder="문의하실 내용을 자세히 작성해 주세요.&#10;&#10;예) 보유 IT자산 현황, 희망 처리 방식, 일정 등"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none" />
                  </div>

                  {/* 첨부파일 */}
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block">첨부파일</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">파일을 드래그하거나 <span className="text-emerald-600 font-bold">클릭하여 업로드</span></p>
                      <p className="text-xs text-slate-400 mt-1">PDF, Excel, 이미지 (최대 10MB)</p>
                    </div>
                  </div>

                  {/* 개인정보 동의 */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={inquiryForm.agreePrivacy}
                        onChange={e => setInquiryForm({ ...inquiryForm, agreePrivacy: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5" />
                      <div>
                        <span className="text-sm font-bold text-slate-700">개인정보 수집 및 이용 동의 <span className="text-rose-500">*</span></span>
                        <p className="text-xs text-slate-400 mt-1">수집항목: 기업명, 성명, 이메일, 연락처 | 수집목적: 문의 접수 및 답변 | 보유기간: 답변 완료 후 1년</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 모달 하단 버튼 */}
                <div className="sticky bottom-0 bg-white border-t border-slate-100 p-6 rounded-b-3xl flex items-center justify-between">
                  <button onClick={() => setShowInquiryModal(false)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors">
                    취소
                  </button>
                  <button
                    onClick={() => {
                      if (!inquiryForm.title || !inquiryForm.company || !inquiryForm.name || !inquiryForm.email || !inquiryForm.content) {
                        alert('필수 항목을 모두 입력해 주세요.');
                        return;
                      }
                      if (!inquiryForm.agreePrivacy) {
                        alert('개인정보 수집 및 이용에 동의해 주세요.');
                        return;
                      }
                      alert('문의가 정상적으로 접수되었습니다.\n담당자가 확인 후 빠르게 답변 드리겠습니다.');
                      setShowInquiryModal(false);
                      setInquiryForm({ category: '서비스 문의', title: '', company: '', name: '', email: '', phone: '', content: '', agreePrivacy: false });
                    }}
                    className={cn(
                      "px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
                      inquiryForm.title && inquiryForm.company && inquiryForm.name && inquiryForm.email && inquiryForm.content && inquiryForm.agreePrivacy
                        ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    <Send className="w-4 h-4" />
                    문의 접수하기
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-2">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <span className="font-bold text-2xl tracking-tighter">K-ITAD</span>
                </div>
                <p className="text-slate-400 max-w-sm leading-relaxed">
                  (주)한국IT자산관리솔루션 | 대표이사: 홍길동<br />
                  서울특별시 강남구 테헤란로 123, IT타워 15층<br />
                  사업자등록번호: 123-45-67890 | TEL: 1588-1234
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6">서비스</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">자산 배출 관리</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">데이터 보안 파기</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">자원 순환 솔루션</a></li>
                  <li><a href="#reports" className="hover:text-white transition-colors">리포트 센터</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">고객지원</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">1:1 문의</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-slate-500 text-xs">
              <p>© 2024 K-ITAD. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이메일무단수집거부</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Sample Preview Modal */}
        <AnimatePresence>
          {selectedSample && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedSample(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedSample} 샘플</h3>
                    <p className="text-slate-500 text-sm mt-1">K-ITAD 표준 리포트 양식 미리보기</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSample(null)}
                    className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 bg-slate-100/50">
                  <div className="bg-white w-full aspect-[1/1.414] shadow-xl rounded-lg p-12 mx-auto max-w-2xl border border-slate-200 relative overflow-hidden">
                    {/* Mock Document Content */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                    <div className="flex justify-between items-start mb-12">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <ShieldCheck className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tighter">K-ITAD</span>
                      </div>
                      <div className="text-right text-[10px] text-slate-400">
                        문서번호: KITAD-2024-0323-001<br />
                        발행일자: 2024. 03. 23
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12 underline underline-offset-8 decoration-emerald-500/30">
                      {selectedSample}
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4">
                        <div className="text-xs font-bold text-slate-400 uppercase">고객사명</div>
                        <div className="col-span-2 text-sm font-bold text-slate-900">(주)샘플코퍼레이션</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-4">
                        <div className="text-xs font-bold text-slate-400 uppercase">사업장 위치</div>
                        <div className="col-span-2 text-sm text-slate-700">서울특별시 강남구 테헤란로 123</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-4">
                        <div className="text-xs font-bold text-slate-400 uppercase">처리 기간</div>
                        <div className="col-span-2 text-sm text-slate-700">2024. 03. 01 ~ 2024. 03. 15</div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="h-40 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <BarChart3 className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-xs">상세 데이터 및 통계 그래프 영역</p>
                      </div>
                    </div>

                    <div className="mt-12 space-y-2">
                      <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                      <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                      <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
                    </div>

                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                      <div className="text-[10px] text-slate-400">
                        본 문서는 K-ITAD 통합 플랫폼을 통해 자동 생성된 공식 리포트입니다.<br />
                        위/변조 방지를 위해 블록체인 기술이 적용되었습니다.
                      </div>
                      <div className="w-20 h-20 border border-slate-100 rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-slate-900 rounded-md flex items-center justify-center">
                          <Globe className="text-white w-8 h-8 opacity-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                  <button 
                    onClick={() => setSelectedSample(null)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
                  >
                    닫기
                  </button>
                  <button className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                    PDF 다운로드
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 사용자 유형 선택 모달 */}
        <AnimatePresence>
          {showRoleSelect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setShowRoleSelect(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900">로그인</h2>
                  <p className="text-slate-500 text-sm mt-2">사용자 유형을 선택하세요</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { role: 'emitter' as const, label: '배출자', desc: '기업 IT자산 배출', icon: FileText, color: 'indigo' },
                    { role: 'transporter' as const, label: '운송회사', desc: '보안 운송 관리', icon: Truck, color: 'violet' },
                    { role: 'processor' as const, label: '처리사', desc: '데이터폐기 / 자산처리', icon: Cog, color: 'emerald' },
                    { role: 'government' as const, label: '정부기관', desc: '관제 / 모니터링', icon: Building2, color: 'amber' },
                  ].map((item) => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setUserRole(item.role);
                        setUserCompany(roleConfig[item.role].company);
                        setActiveTab(roleConfig[item.role].defaultTab);
                        setIsLoggedIn(true);
                        setShowRoleSelect(false);
                      }}
                      className={cn(
                        "p-5 rounded-2xl border-2 text-left transition-all hover:shadow-lg active:scale-[0.98] group",
                        "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                        item.color === 'indigo' ? "bg-indigo-100 text-indigo-600" :
                        item.color === 'violet' ? "bg-violet-100 text-violet-600" :
                        item.color === 'emerald' ? "bg-emerald-100 text-emerald-600" :
                        "bg-amber-100 text-amber-600"
                      )}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-slate-900">{item.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setUserCompany(roleConfig['admin'].company);
                      setActiveTab(roleConfig['admin'].defaultTab);
                      setIsLoggedIn(true);
                      setShowRoleSelect(false);
                    }}
                    className="col-span-2 p-5 rounded-2xl border-2 border-slate-100 hover:border-slate-200 text-left transition-all hover:shadow-lg active:scale-[0.98] flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">협회 관리자</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">전체 메뉴 접근 / 시스템 관리</p>
                    </div>
                  </button>
                </div>
                <button
                  onClick={() => setShowRoleSelect(false)}
                  className="w-full mt-4 py-3 text-sm text-slate-400 font-bold hover:text-slate-600 transition-colors"
                >
                  닫기
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-slate-900 text-white transition-all duration-300 flex flex-col z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight">K-ITAD</span>
            )}
          </div>
          {isSidebarOpen && (
            <div className="mt-3 px-1">
              <p className="text-[10px] text-slate-500 font-bold">{roleConfig[userRole]?.label}</p>
              <p className="text-xs text-slate-300 font-bold">{userCompany}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                activeTab === item.id 
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", activeTab === item.id ? "text-white" : "group-hover:text-white")} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="자산 번호(S/N) 또는 태그 검색..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">홍길동 팀장</p>
                <p className="text-xs text-slate-500">배출처 (SKT)</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 cursor-pointer" onClick={() => setIsLoggedIn(false)}>
                <User className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
