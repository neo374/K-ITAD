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
  CircleDollarSign
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
  const [showInquiryBoard, setShowInquiryBoard] = useState(false);
  const [supportTab, setSupportTab] = useState('board');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ category: '서비스 문의', title: '', company: '', name: '', email: '', phone: '', content: '', agreePrivacy: false });
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  // Emission Tab & Form State
  const [emissionTab, setEmissionTab] = useState<'form' | 'list'>('list');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmissionDetail, setSelectedEmissionDetail] = useState<string | null>(null);
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
    { id: 'DSP-2026-00127', company: 'LG CNS', applicant: '박엘지', department: 'IT운영팀', contact: '010-9999-0000', email: 'park@lgcns.com', status: '승인대기' as string, createdAt: '2026-03-24 13:45', assetCount: 40, assetSummary: 'HP ProLiant DL380 외 39대', deletionGrade: '보안삭제(NIST 800-88)', collectionDate: '2026-03-30', address: '서울 마포구 월드컵북로 56길 19', processing: '재활용 우선', securityGrade: '기밀', transportId: '', totalWeight: '1,200kg' },
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

  // Transport - Integrity Check State
  const [selectedEmissionId, setSelectedEmissionId] = useState('DSP-2026-00123');
  const [continuousScan, setContinuousScan] = useState(true);
  const [scanInput, setScanInput] = useState('');
  const [scanFilter, setScanFilter] = useState('전체');
  const [scanSearch, setScanSearch] = useState('');
  const [showTransportStartPopup, setShowTransportStartPopup] = useState(false);
  const [sealNumber, setSealNumber] = useState('');
  const scanInputRef = useRef<HTMLInputElement>(null);
  const [scanFeedback, setScanFeedback] = useState<{status: string; message: string; sn: string} | null>(null);
  const [scanLog, setScanLog] = useState<{sn: string; status: string; time: string; assetId: string}[]>([]);

  // Transport - Phase 2 Monitoring State
  const [transportPhase, setTransportPhase] = useState<'integrity' | 'monitoring'>('integrity');
  const [selectedTransport, setSelectedTransport] = useState<string | null>('TRN-2026-00051');
  const [transportFilter, setTransportFilter] = useState('전체');

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
    if (transportPhase !== 'monitoring') return;
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
  }, [transportPhase]);

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
  const [disposalTab, setDisposalTab] = useState<'progress' | 'detail' | 'certificates' | 'stats'>('progress');
  const [disposalStepFilter, setDisposalStepFilter] = useState('전체');
  const [disposalSearch, setDisposalSearch] = useState('');
  const [disposalMethodFilter, setDisposalMethodFilter] = useState('전체');
  const [disposalDelayOnly, setDisposalDelayOnly] = useState(false);
  const [selectedDisposalAsset, setSelectedDisposalAsset] = useState<string | null>(null);
  const [certChecked, setCertChecked] = useState<string[]>([]);

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

  // ===== 자산 처리 (Asset Processing) State =====
  const [processingTab, setProcessingTab] = useState<'status' | 'disassembly' | 'disposition' | 'stats'>('status');
  const [selectedProcessingAsset, setSelectedProcessingAsset] = useState<string | null>(null);
  const [processingFilter, setProcessingFilter] = useState('전체');

  const assetProcessingData = {
    summary: { awaiting: 5, disassembling: 3, sorted: 8, disposed: 42, totalParts: 386, reuseRate: 28.5, recycleRate: 64.2, wasteRate: 7.3 },
    assets: [
      { id: 'PRC-001', sourceId: 'DIS-001', assetId: 'AST-001', type: 'Server', model: 'Dell PowerEdge R740', stage: '분류완료' as string, startDate: '2026-03-22', endDate: '2026-03-23', operator: '정분해',
        parts: [
          { id: 'P-001-1', name: 'CPU (Xeon Gold 6248)', category: 'CPU', condition: '양호', route: '재사용' as string, material: '', weight: '0.3kg', value: '₩85,000' },
          { id: 'P-001-2', name: 'RAM DDR4 32GB x4', category: 'RAM', condition: '양호', route: '재사용' as string, material: '', weight: '0.4kg', value: '₩120,000' },
          { id: 'P-001-3', name: 'HDD Seagate Exos 18TB', category: 'Storage', condition: '폐기완료', route: '폐기' as string, material: '', weight: '0.8kg', value: '—' },
          { id: 'P-001-4', name: '파워서플라이 750W', category: 'PSU', condition: '양호', route: '부품회수' as string, material: '', weight: '1.5kg', value: '₩35,000' },
          { id: 'P-001-5', name: '메인보드', category: 'PCB', condition: '수명초과', route: '재활용' as string, material: 'Au 0.3g, Cu 45g', weight: '1.2kg', value: '₩28,000' },
          { id: 'P-001-6', name: '섀시 (알루미늄)', category: 'Chassis', condition: '양호', route: '재활용' as string, material: 'Al 4.2kg', weight: '4.5kg', value: '₩12,000' },
          { id: 'P-001-7', name: '쿨링팬 x3', category: 'Cooling', condition: '불량', route: '재활용' as string, material: 'Cu 0.2kg, Plastic', weight: '0.6kg', value: '₩2,000' },
          { id: 'P-001-8', name: '케이블류', category: 'Cable', condition: '—', route: '재활용' as string, material: 'Cu 0.5kg', weight: '0.8kg', value: '₩3,000' },
        ]},
      { id: 'PRC-002', sourceId: 'DIS-003', assetId: 'AST-003', type: 'PC', model: 'HP EliteDesk 800', stage: '분해중' as string, startDate: '2026-03-23', endDate: '',  operator: '정분해',
        parts: [
          { id: 'P-002-1', name: 'CPU (i7-12700)', category: 'CPU', condition: '양호', route: '재사용' as string, material: '', weight: '0.1kg', value: '₩45,000' },
          { id: 'P-002-2', name: 'RAM DDR4 16GB x2', category: 'RAM', condition: '양호', route: '재사용' as string, material: '', weight: '0.2kg', value: '₩40,000' },
          { id: 'P-002-3', name: 'SSD Samsung 870 EVO 500GB', category: 'Storage', condition: '폐기완료', route: '폐기' as string, material: '', weight: '0.05kg', value: '—' },
          { id: 'P-002-4', name: '메인보드', category: 'PCB', condition: '검수중', route: '' as string, material: 'Au 0.1g, Cu 25g', weight: '0.6kg', value: '' },
          { id: 'P-002-5', name: '섀시 (스틸)', category: 'Chassis', condition: '양호', route: '재활용' as string, material: 'Fe 3.5kg', weight: '3.8kg', value: '₩5,000' },
        ]},
      { id: 'PRC-003', sourceId: 'DIS-005', assetId: 'AST-005', type: 'Notebook', model: 'Lenovo ThinkPad X1', stage: '분해대기' as string, startDate: '', endDate: '', operator: '',
        parts: []},
      { id: 'PRC-004', sourceId: '', assetId: 'AST-010', type: 'Server', model: 'HP ProLiant DL380', stage: '처분완료' as string, startDate: '2026-03-15', endDate: '2026-03-18', operator: '정분해',
        parts: [
          { id: 'P-004-1', name: 'CPU (Xeon Silver 4214) x2', category: 'CPU', condition: '양호', route: '재사용' as string, material: '', weight: '0.6kg', value: '₩110,000' },
          { id: 'P-004-2', name: 'RAM DDR4 64GB x8', category: 'RAM', condition: '양호', route: '재사용' as string, material: '', weight: '0.8kg', value: '₩280,000' },
          { id: 'P-004-3', name: 'SSD PM9A3 3.84TB x4', category: 'Storage', condition: '폐기완료', route: '폐기' as string, material: '', weight: '1.2kg', value: '—' },
          { id: 'P-004-4', name: '파워서플라이 1200W x2', category: 'PSU', condition: '양호', route: '부품회수' as string, material: '', weight: '3.2kg', value: '₩90,000' },
          { id: 'P-004-5', name: '메인보드', category: 'PCB', condition: '수명초과', route: '재활용' as string, material: 'Au 0.5g, Cu 60g, Ag 0.2g', weight: '1.8kg', value: '₩45,000' },
          { id: 'P-004-6', name: '섀시 (알루미늄)', category: 'Chassis', condition: '양호', route: '재활용' as string, material: 'Al 6.8kg', weight: '7.2kg', value: '₩18,000' },
          { id: 'P-004-7', name: 'RAID 컨트롤러', category: 'PCB', condition: '양호', route: '부품회수' as string, material: '', weight: '0.3kg', value: '₩55,000' },
          { id: 'P-004-8', name: '네트워크카드 10GbE', category: 'PCB', condition: '양호', route: '부품회수' as string, material: '', weight: '0.2kg', value: '₩40,000' },
          { id: 'P-004-9', name: '쿨링 시스템', category: 'Cooling', condition: '불량', route: '재활용' as string, material: 'Cu 0.8kg', weight: '1.0kg', value: '₩5,000' },
          { id: 'P-004-10', name: '케이블/커넥터류', category: 'Cable', condition: '—', route: '재활용' as string, material: 'Cu 0.8kg', weight: '1.0kg', value: '₩4,000' },
        ]},
    ],
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

  const filteredProcessingAssets = assetProcessingData.assets.filter(a =>
    processingFilter === '전체' || a.stage === processingFilter
  );

  const disposalSteps = ['입고 확인', '자산 검수', '폐기 방식 배정', '폐기 수행', '검증', '인증서 발급', '완료'];

  const disposalAssets = [
    { id: 'DIS-001', assetId: 'AST-001', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'Dell PowerEdge R740', mediaType: 'HDD', mediaModel: 'Seagate Exos X18', serialNumber: 'WCT3E1234567', capacity: '18TB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '완료', operator: '김보안', operatorCert: 'NIST 인증 기사', scheduledDate: '2026-03-22', startDate: '2026-03-22 09:00', endDate: '2026-03-22 11:30', duration: '2시간 30분', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '3-pass', verification: 'Pass', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: 'CoD-2026-00456' },
    { id: 'DIS-002', assetId: 'AST-002', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'Dell PowerEdge R740', mediaType: 'SSD', mediaModel: 'Samsung PM9A3', serialNumber: 'S5GFNA0T12345', capacity: '3.84TB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '검증', operator: '김보안', operatorCert: 'NIST 인증 기사', scheduledDate: '2026-03-22', startDate: '2026-03-22 13:00', endDate: '', duration: '', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: 'Cryptographic Erase', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-003', assetId: 'AST-003', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'PC', model: 'HP EliteDesk 800', mediaType: 'HDD', mediaModel: 'WD Blue 1TB', serialNumber: 'WD-WMC3T0123456', capacity: '1TB', mediaStatus: '배드섹터', method: '물리파괴', step: '폐기 수행', operator: '박파쇄', operatorCert: 'e-Stewards 인증', scheduledDate: '2026-03-23', startDate: '2026-03-23 10:00', endDate: '', duration: '', standard: 'DoD 5220.22-M', software: '', algorithm: '', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-004', assetId: 'AST-004', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'PC', model: 'HP EliteDesk 800', mediaType: 'SSD', mediaModel: 'Samsung 870 EVO', serialNumber: 'S6B2NJ0T98765', capacity: '500GB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '폐기 방식 배정', operator: '', operatorCert: '', scheduledDate: '2026-03-24', startDate: '', endDate: '', duration: '', standard: 'NIST 800-88', software: '', algorithm: '', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-005', assetId: 'AST-005', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Notebook', model: 'Lenovo ThinkPad X1', mediaType: 'NVMe', mediaModel: 'Samsung 980 PRO', serialNumber: 'S69ENF0T55555', capacity: '1TB', mediaStatus: '정상', method: '소프트웨어 삭제', step: '자산 검수', operator: '', operatorCert: '', scheduledDate: '2026-03-24', startDate: '', endDate: '', duration: '', standard: '', software: '', algorithm: '', verification: '', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-006', assetId: 'AST-006', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Notebook', model: 'Lenovo ThinkPad X1', mediaType: 'NVMe', mediaModel: 'WD Black SN850X', serialNumber: 'WD-SN850X77777', capacity: '2TB', mediaStatus: '정상', method: '디가우징', step: '입고 확인', operator: '', operatorCert: '', scheduledDate: '2026-03-25', startDate: '', endDate: '', duration: '', standard: '', software: '', algorithm: '', verification: '', delayed: true, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
    { id: 'DIS-007', assetId: 'AST-007', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'NetApp AFF A400', mediaType: 'SSD', mediaModel: 'NetApp NSE', serialNumber: 'NA-NSE-0011223', capacity: '7.68TB', mediaStatus: '정상', method: '복합처리', step: '완료', operator: '이기사', operatorCert: 'R2 인증', scheduledDate: '2026-03-21', startDate: '2026-03-21 14:00', endDate: '2026-03-21 17:45', duration: '3시간 45분', standard: 'NIST 800-88', software: 'Blancco Drive Eraser 7.2', algorithm: '7-pass', verification: 'Pass', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: 'CoD-2026-00457' },
    { id: 'DIS-008', assetId: 'AST-008', emissionId: 'DSP-2026-00123', transportId: 'TRN-2026-00051', type: 'Server', model: 'NetApp AFF A400', mediaType: 'HDD', mediaModel: 'NetApp X448A', serialNumber: 'NA-X448A-99887', capacity: '8TB', mediaStatus: '인식불가', method: '물리파괴', step: '인증서 발급', operator: '박파쇄', operatorCert: 'e-Stewards 인증', scheduledDate: '2026-03-22', startDate: '2026-03-22 15:00', endDate: '2026-03-22 15:30', duration: '30분', standard: 'DoD 5220.22-M', software: '', algorithm: '', verification: 'Pass', delayed: false, company: 'K-ITAD 전자', department: 'IT인프라팀', securityGrade: '기밀', certId: '' },
  ];

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
  const disposalSecurityData = [
    { grade: '일반', total: 45, completed: 40 },
    { grade: '중요', total: 32, completed: 28 },
    { grade: '기밀', total: 25, completed: 18 },
    { grade: '극비', total: 8, completed: 5 },
  ];

  // Mock emission request data
  const emissionRequestInfo = {
    id: 'DSP-2026-00123',
    company: 'K-ITAD 전자',
    department: 'IT인프라팀',
    requestDate: '2026-03-20',
    totalAssets: 47,
    address: '서울특별시 강남구 테헤란로 521',
    addressDetail: 'K-ITAD 빌딩 5층 전산실',
    securityGrade: '기밀',
  };

  // Asset list for integrity check
  const [integrityAssets, setIntegrityAssets] = useState([
    { id: 'AST-001', sn: 'SN-982341', type: 'Server', manufacturer: 'Dell', model: 'PowerEdge R740', status: 'pending' as string, scanTime: '', remark: '' },
    { id: 'AST-002', sn: 'SN-982342', type: 'Server', manufacturer: 'Dell', model: 'PowerEdge R740', status: 'pending' as string, scanTime: '', remark: '' },
    { id: 'AST-003', sn: 'SN-123456', type: 'PC', manufacturer: 'HP', model: 'EliteDesk 800', status: 'pending' as string, scanTime: '', remark: '' },
    { id: 'AST-004', sn: 'SN-123457', type: 'PC', manufacturer: 'HP', model: 'EliteDesk 800', status: 'pending' as string, scanTime: '', remark: '' },
    { id: 'AST-005', sn: 'SN-778899', type: 'Notebook', manufacturer: 'Lenovo', model: 'ThinkPad X1', status: 'pending' as string, scanTime: '', remark: '' },
    { id: 'AST-006', sn: 'SN-778900', type: 'Notebook', manufacturer: 'Lenovo', model: 'ThinkPad X1', status: 'pending' as string, scanTime: '', remark: '' },
    { id: 'AST-007', sn: 'SN-554433', type: 'Server', manufacturer: 'NetApp', model: 'AFF A400', status: 'pending' as string, scanTime: '', remark: '' },
    { id: 'AST-008', sn: 'SN-554434', type: 'Server', manufacturer: 'NetApp', model: 'AFF A400', status: 'pending' as string, scanTime: '', remark: '' },
  ]);

  // Mismatch modal state
  const [mismatchModal, setMismatchModal] = useState<{open: boolean; assetId: string; sn: string}>({open: false, assetId: '', sn: ''});
  const [mismatchReason, setMismatchReason] = useState('시리얼 다름');
  const [mismatchMemo, setMismatchMemo] = useState('');
  const [mismatchAction, setMismatchAction] = useState('그대로 포함');

  const handleScan = (sn: string) => {
    if (!sn.trim()) return;
    const now = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const asset = integrityAssets.find(a => a.sn === sn);

    if (asset) {
      if (asset.status !== 'pending') {
        // Duplicate scan
        setScanFeedback({ status: 'duplicate', message: `이미 스캔 완료된 자산입니다. (${asset.id})`, sn });
        setScanLog(prev => [{ sn, status: 'duplicate', time: now, assetId: asset.id }, ...prev]);
      } else {
        // Match
        setIntegrityAssets(prev => prev.map(a => a.id === asset.id ? { ...a, status: 'matched', scanTime: now } : a));
        setScanFeedback({ status: 'matched', message: `일치 - ${asset.type} ${asset.manufacturer} ${asset.model}`, sn });
        setScanLog(prev => [{ sn, status: 'matched', time: now, assetId: asset.id }, ...prev]);
      }
    } else {
      // Unregistered
      setScanFeedback({ status: 'unregistered', message: '배출신청 목록에 없는 자산입니다.', sn });
      setScanLog(prev => [{ sn, status: 'unregistered', time: now, assetId: '-' }, ...prev]);
    }
    setScanInput('');
    if (continuousScan && scanInputRef.current) {
      scanInputRef.current.focus();
    }
    setTimeout(() => setScanFeedback(null), 3000);
  };

  const handleMismatch = (assetId: string, sn: string) => {
    setIntegrityAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: 'mismatched', remark: `${mismatchReason}: ${mismatchMemo}`, scanTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) } : a));
    setScanLog(prev => [{ sn, status: 'mismatched', time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), assetId }, ...prev]);
    setMismatchModal({ open: false, assetId: '', sn: '' });
    setMismatchReason('시리얼 다름');
    setMismatchMemo('');
    setMismatchAction('그대로 포함');
  };

  const resetIntegrityCheck = () => {
    setIntegrityAssets(prev => prev.map(a => ({ ...a, status: 'pending', scanTime: '', remark: '' })));
    setScanLog([]);
    setScanFeedback(null);
  };

  const scannedCount = integrityAssets.filter(a => a.status !== 'pending').length;
  const matchedCount = integrityAssets.filter(a => a.status === 'matched').length;
  const mismatchedCount = integrityAssets.filter(a => a.status === 'mismatched').length;
  const unregisteredCount = scanLog.filter(l => l.status === 'unregistered').length;
  const allScanned = scannedCount === integrityAssets.length;
  const hasIssues = mismatchedCount > 0 || unregisteredCount > 0;

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

  const navItems = [
    { id: 'emission', label: '배출신청', icon: FileText },
    { id: 'transport', label: '보안 운송', icon: Truck },
    { id: 'disposal', label: '데이터 폐기', icon: ShieldCheck },
    { id: 'processing', label: '자산 처리', icon: Cog },
    { id: 'circulation', label: '자원 순환', icon: Recycle },
    { id: 'reports', label: '리포트 센터', icon: BarChart3 },
    { id: 'allbaro', label: '올바로 연동', icon: Link2 },
    { id: 'settings', label: '시스템 관리', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'emission':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-5xl mx-auto space-y-6 pb-20"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">배출신청</h1>
                <p className="text-slate-500 mt-1">{emissionTab === 'form' ? 'IT 자산 배출을 위한 정보를 단계별로 입력해 주세요.' : '배출신청 내역을 확인하고 관리합니다.'}</p>
              </div>
            </div>

            {/* 탭 전환 */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
              <button onClick={() => { setEmissionTab('list'); setSelectedEmissionDetail(null); }}
                className={cn("flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold transition-all",
                  emissionTab === 'list' ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}>
                <ClipboardList className="w-4 h-4" /> 배출신청 확인
              </button>
              <button onClick={() => setEmissionTab('form')}
                className={cn("flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold transition-all",
                  emissionTab === 'form' ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}>
                <PlusCircle className="w-4 h-4" /> 신규 배출신청
              </button>
            </div>

            {/* ===== 배출신청 확인 탭 ===== */}
            {emissionTab === 'list' && !selectedEmissionDetail && (
              <div className="space-y-4">
                {/* 필터/검색 */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl">
                    {['전체', '신청완료', '승인대기', '운송중', '처리완료'].map(f => (
                      <button key={f} onClick={() => setEmissionStatusFilter(f)}
                        className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          emissionStatusFilter === f ? "bg-emerald-600 text-white" : "text-slate-500 hover:bg-slate-50"
                        )}>{f}</button>
                    ))}
                  </div>
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={emissionSearchQuery} onChange={e => setEmissionSearchQuery(e.target.value)}
                      placeholder="신청번호, 기업명, 신청자 검색..."
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                </div>

                {/* 요약 카드 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '전체 신청', value: emissionRequests.length, color: 'slate' },
                    { label: '신청/승인대기', value: emissionRequests.filter(e => e.status === '신청완료' || e.status === '승인대기').length, color: 'amber' },
                    { label: '운송중', value: emissionRequests.filter(e => e.status === '운송중').length, color: 'blue' },
                    { label: '처리완료', value: emissionRequests.filter(e => e.status === '처리완료').length, color: 'emerald' },
                  ].map((card, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-xs font-bold text-slate-500">{card.label}</p>
                      <p className={cn("text-2xl font-black mt-1",
                        card.color === 'amber' ? "text-amber-600" :
                        card.color === 'blue' ? "text-blue-600" :
                        card.color === 'emerald' ? "text-emerald-600" : "text-slate-900"
                      )}>{card.value}<span className="text-sm font-bold text-slate-400 ml-1">건</span></p>
                    </div>
                  ))}
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
                        <th className="text-left px-4 py-3 font-bold text-slate-600">보안등급</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">상태</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmissions.map(e => (
                        <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-bold text-emerald-700 cursor-pointer hover:underline" onClick={() => setSelectedEmissionDetail(e.id)}>{e.id}</td>
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
                            <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                              e.securityGrade === '기밀' ? "bg-purple-100 text-purple-700" :
                              e.securityGrade === '중요' ? "bg-amber-100 text-amber-700" :
                              "bg-slate-100 text-slate-600"
                            )}>{e.securityGrade}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                              e.status === '신청완료' ? "bg-blue-100 text-blue-700" :
                              e.status === '승인대기' ? "bg-amber-100 text-amber-700" :
                              e.status === '운송중' ? "bg-indigo-100 text-indigo-700" :
                              "bg-emerald-100 text-emerald-700"
                            )}>{e.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setSelectedEmissionDetail(e.id)}
                                className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold hover:bg-slate-200 transition-all">
                                상세
                              </button>
                              {(e.status === '신청완료' || e.status === '승인대기') && (
                                <>
                                  <button className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold hover:bg-blue-100 transition-all">
                                    수정
                                  </button>
                                  <button onClick={() => {
                                    if (confirm(`${e.id} 배출신청을 삭제하시겠습니까?`)) {
                                      setEmissionRequests(prev => prev.filter(r => r.id !== e.id));
                                    }
                                  }} className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg text-[11px] font-bold hover:bg-rose-100 transition-all">
                                    삭제
                                  </button>
                                </>
                              )}
                            </div>
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

            {/* ===== 배출신청 상세 보기 ===== */}
            {emissionTab === 'list' && selectedEmissionDetail && selectedEmissionData && (
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
                        selectedEmissionData.status === '승인대기' ? "bg-amber-100 text-amber-700" :
                        selectedEmissionData.status === '운송중' ? "bg-indigo-100 text-indigo-700" :
                        "bg-emerald-100 text-emerald-700"
                      )}>{selectedEmissionData.status}</span>
                      {(selectedEmissionData.status === '신청완료' || selectedEmissionData.status === '승인대기') && (
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
                          { label: '보안등급', value: selectedEmissionData.securityGrade },
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
                          { step: '배출 신청', done: true },
                          { step: '승인 완료', done: selectedEmissionData.status !== '신청완료' && selectedEmissionData.status !== '승인대기' },
                          { step: '수거/운송', done: selectedEmissionData.status === '운송중' || selectedEmissionData.status === '처리완료', active: selectedEmissionData.status === '운송중' },
                          { step: '데이터 폐기', done: selectedEmissionData.status === '처리완료' },
                          { step: '처리 완료', done: selectedEmissionData.status === '처리완료' },
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
            {emissionTab === 'form' && <>

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
                      {step === 5 && "처리 방식"}
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Individual Registration Form */}
                      <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl space-y-4">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          개별 자산 추가
                        </h4>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">자산 유형</label>
                            <select 
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                              value={currentAsset.type}
                              onChange={(e) => setCurrentAsset({...currentAsset, type: e.target.value})}
                            >
                              <option>PC</option>
                              <option>노트북</option>
                              <option>서버</option>
                              <option>모니터</option>
                              <option>모바일</option>
                              <option>네트워크장비</option>
                              <option>프린터</option>
                              <option>기타</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">제조사</label>
                            <div className="flex flex-col gap-1.5">
                              <select 
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                                value={['Samsung', 'HP', 'Dell', 'Lenovo', 'Apple', 'LG', ''].includes(currentAsset.manufacturer) ? currentAsset.manufacturer : '직접입력'}
                                onChange={(e) => {
                                  if (e.target.value === '직접입력') {
                                    setCurrentAsset({...currentAsset, manufacturer: ''});
                                  } else {
                                    setCurrentAsset({...currentAsset, manufacturer: e.target.value});
                                  }
                                }}
                              >
                                <option value="">선택</option>
                                <option value="Samsung">Samsung</option>
                                <option value="HP">HP</option>
                                <option value="Dell">Dell</option>
                                <option value="Lenovo">Lenovo</option>
                                <option value="Apple">Apple</option>
                                <option value="LG">LG</option>
                                <option value="직접입력">직접입력</option>
                              </select>
                              {(!['Samsung', 'HP', 'Dell', 'Lenovo', 'Apple', 'LG', ''].includes(currentAsset.manufacturer)) && (
                                <input 
                                  type="text" 
                                  placeholder="제조사 직접 입력"
                                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                                  value={currentAsset.manufacturer}
                                  onChange={(e) => setCurrentAsset({...currentAsset, manufacturer: e.target.value})}
                                />
                              )}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">모델명</label>
                            <input 
                              type="text" 
                              placeholder="모델명을 입력하세요"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                              value={currentAsset.model}
                              onChange={(e) => setCurrentAsset({...currentAsset, model: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-500">수량</label>
                              <input 
                                type="number" 
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                                value={currentAsset.quantity}
                                onChange={(e) => setCurrentAsset({...currentAsset, quantity: parseInt(e.target.value) || 0})}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-500">제조연도 (선택)</label>
                              <input 
                                type="text" 
                                placeholder="YYYY"
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                                value={currentAsset.year}
                                onChange={(e) => setCurrentAsset({...currentAsset, year: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">자산번호 (선택)</label>
                            <input 
                              type="text" 
                              placeholder="사내 관리번호"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                              value={currentAsset.assetNo}
                              onChange={(e) => setCurrentAsset({...currentAsset, assetNo: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">외관 상태</label>
                            <div className="flex flex-wrap gap-2">
                              {['양호', '경미손상', '파손', '전원불가'].map(s => (
                                <button 
                                  key={s}
                                  onClick={() => setCurrentAsset({...currentAsset, condition: s})}
                                  className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    currentAsset.condition === s ? "bg-emerald-500 text-white" : "bg-white text-slate-500 border border-slate-200"
                                  )}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">장비 사진 (선택 - 최대 3장)</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square bg-white border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-400 hover:border-slate-400 cursor-pointer transition-all">
                                  <Camera className="w-5 h-5" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500">비고</label>
                            <textarea 
                              placeholder="특이사항 자유 기재"
                              className="w-full h-20 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none resize-none"
                              value={currentAsset.remarks}
                              onChange={(e) => setCurrentAsset({...currentAsset, remarks: e.target.value})}
                            ></textarea>
                          </div>
                          <button 
                            onClick={addAsset}
                            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm mt-4 hover:bg-slate-800 transition-colors"
                          >
                            목록에 추가
                          </button>
                        </div>
                      </div>

                      {/* Asset List */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900">등록된 자산 목록 ({formData.assets.length})</h4>
                          {formData.assets.length > 0 && (
                            <button 
                              onClick={() => setFormData({...formData, assets: []})}
                              className="text-xs font-bold text-red-500 hover:underline"
                            >
                              전체 삭제
                            </button>
                          )}
                        </div>
                        {formData.assets.length === 0 ? (
                          <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                            <Monitor className="w-12 h-12 mb-2 opacity-20" />
                            <p className="text-sm font-medium">등록된 자산이 없습니다.</p>
                            <p className="text-xs mt-1">왼쪽 폼에서 자산을 추가해 주세요.</p>
                          </div>
                        ) : (
                          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {formData.assets.map((asset) => (
                              <div key={asset.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between group hover:border-emerald-500 transition-all">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                    <Monitor className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-900">{asset.manufacturer} {asset.model}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{asset.type}</span>
                                      <span className="text-[10px] text-slate-400">{asset.quantity}대 | {asset.condition}</span>
                                    </div>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => removeAsset(asset.id)}
                                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ))}
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
                      <h3 className="text-xl font-bold text-slate-900">STEP 5. 처리 방식 선택</h3>
                      <p className="text-slate-500 text-sm mt-1">자산의 최종 처리 방식과 정산 옵션을 선택해 주세요.</p>
                    </div>
                    <div className="max-w-3xl space-y-10">
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-700">희망 처리 방식 (복수 선택 가능)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {['재사용(리퍼)', '부품회수', '소재재활용', '폐기', '업체에 위임'].map(m => (
                            <button 
                              key={m}
                              onClick={() => {
                                const methods = formData.processingMethods.includes(m)
                                  ? formData.processingMethods.filter(x => x !== m)
                                  : [...formData.processingMethods, m];
                                setFormData({...formData, processingMethods: methods});
                              }}
                              className={cn(
                                "p-4 rounded-xl border-2 text-center font-bold transition-all",
                                formData.processingMethods.includes(m) ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-100 text-slate-500 hover:border-slate-200"
                              )}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-700">잔존가치 정산 희망</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {['정산 받겠음', '처리비 지불', '업체 견적에 따름'].map(v => (
                            <button 
                              key={v}
                              onClick={() => setFormData({...formData, settlementPreference: v})}
                              className={cn(
                                "p-4 rounded-xl border-2 text-center font-bold transition-all",
                                formData.settlementPreference === v ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-100 text-slate-500 hover:border-slate-200"
                              )}
                            >
                              {v}
                            </button>
                          ))}
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
            </>}
          </motion.div>
        );
      case 'transport':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 pb-20"
          >
            {transportPhase === 'monitoring' ? (
              /* =============== PHASE 2: 운송 모니터링 =============== */
              <>
                {/* Page Title */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                      <Navigation className="w-8 h-8 text-indigo-600" />
                      보안운송 — 실시간 모니터링
                    </h1>
                    <p className="text-slate-500 mt-1">운송 차량의 위치, 보안 상태, 경로를 실시간으로 추적합니다.</p>
                  </div>
                  <button
                    onClick={() => setTransportPhase('integrity')}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    정합성 확인으로 돌아가기
                  </button>
                </div>

                {/* ===== 상단 요약 카드 4개 ===== */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: '금일 운송 건수',
                      value: `${transportMonitorData.summary.todayTotal.inProgress + transportMonitorData.summary.todayTotal.completed + transportMonitorData.summary.todayTotal.scheduled}`,
                      sub: `진행 ${transportMonitorData.summary.todayTotal.inProgress} / 완료 ${transportMonitorData.summary.todayTotal.completed} / 예정 ${transportMonitorData.summary.todayTotal.scheduled}`,
                      icon: Truck,
                      color: 'indigo',
                    },
                    {
                      label: '경로이탈 알림',
                      value: `${transportMonitorData.summary.routeDeviation}`,
                      sub: transportMonitorData.summary.routeDeviation === 0 ? '이상 없음' : '이탈 감지!',
                      icon: Route,
                      color: transportMonitorData.summary.routeDeviation === 0 ? 'emerald' : 'rose',
                    },
                    {
                      label: '봉인 상태 이상',
                      value: `${transportMonitorData.summary.sealIssues}`,
                      sub: transportMonitorData.summary.sealIssues === 0 ? '전체 정상' : '이상 감지!',
                      icon: Shield,
                      color: transportMonitorData.summary.sealIssues === 0 ? 'emerald' : 'rose',
                    },
                    {
                      label: '평균 운송 소요시간',
                      value: transportMonitorData.summary.avgDuration.value,
                      sub: `전일 대비 ${transportMonitorData.summary.avgDuration.change}분`,
                      icon: Timer,
                      color: 'slate',
                    },
                  ].map((card, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          card.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                          card.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                          card.color === 'rose' ? "bg-rose-50 text-rose-600" :
                          "bg-slate-50 text-slate-600"
                        )}>
                          <card.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-500">{card.label}</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900">{card.value}</p>
                      <p className={cn(
                        "text-xs font-bold mt-1",
                        card.color === 'rose' ? "text-rose-500" : card.color === 'emerald' ? "text-emerald-500" : "text-slate-400"
                      )}>{card.sub}</p>
                    </div>
                  ))}
                </div>

                {/* ===== 메인: 지도 + 상세패널 ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 실시간 지도 영역 (2/3) */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                        실시간 차량 위치
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-bold">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> 정상</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /> 지연</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500" /> 이상</span>
                      </div>
                    </div>
                    {/* 실시간 지도 (도로지도 스타일) */}
                    <div className="relative h-[420px] overflow-hidden bg-[#e8e4d8]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice">
                        {/* === 바다 / 강 === */}
                        <rect width="800" height="420" fill="#e8e4d8" />
                        {/* 서해 (인천 서쪽) */}
                        <path d="M 0 0 L 120 0 L 100 50 L 80 120 L 60 200 L 50 280 L 70 350 L 90 420 L 0 420 Z" fill="#b3d4e8" opacity="0.6" />
                        {/* 한강 */}
                        <path d="M 800 160 C 720 155, 650 170, 580 165 C 510 160, 450 175, 380 180 C 310 185, 240 170, 180 190 C 140 200, 110 210, 60 200"
                              stroke="#a3c9e2" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.7" />
                        <path d="M 800 160 C 720 155, 650 170, 580 165 C 510 160, 450 175, 380 180 C 310 185, 240 170, 180 190 C 140 200, 110 210, 60 200"
                              stroke="#b8d8ed" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.5" />
                        {/* 안양천 */}
                        <path d="M 520 420 C 530 380, 525 340, 530 300 C 535 260, 520 230, 500 200" stroke="#a3c9e2" strokeWidth="5" fill="none" opacity="0.5" />

                        {/* === 녹지대 / 산 === */}
                        <ellipse cx="350" cy="70" rx="60" ry="35" fill="#c5d9a4" opacity="0.4" />
                        <ellipse cx="680" cy="90" rx="50" ry="30" fill="#c5d9a4" opacity="0.35" />
                        <ellipse cx="750" cy="380" rx="55" ry="30" fill="#c5d9a4" opacity="0.3" />
                        <ellipse cx="250" cy="400" rx="40" ry="25" fill="#c5d9a4" opacity="0.3" />

                        {/* === 고속도로 (굵은 노란색) === */}
                        {/* 경인고속도로 */}
                        <path d="M 750 220 C 680 215, 600 210, 520 205 C 440 200, 350 195, 270 200 C 190 205, 140 210, 100 190"
                              stroke="#f5d775" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M 750 220 C 680 215, 600 210, 520 205 C 440 200, 350 195, 270 200 C 190 205, 140 210, 100 190"
                              stroke="#ffe599" strokeWidth="4" fill="none" strokeLinecap="round" />
                        {/* 서울외곽순환 */}
                        <path d="M 600 50 C 620 100, 640 150, 630 200 C 620 250, 590 300, 550 350 C 510 380, 460 400, 400 410"
                              stroke="#f5d775" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
                        {/* 영동고속도로 */}
                        <path d="M 800 280 C 740 270, 680 265, 620 260 C 560 255, 500 250, 440 250"
                              stroke="#f5d775" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />

                        {/* === 주요도로 (흰색) === */}
                        <path d="M 600 320 C 580 290, 570 260, 560 230" stroke="#ffffff" strokeWidth="4" fill="none" />
                        <path d="M 660 350 C 630 320, 600 280, 560 250" stroke="#ffffff" strokeWidth="4" fill="none" />
                        <path d="M 720 370 C 690 340, 640 300, 590 270" stroke="#ffffff" strokeWidth="4" fill="none" />
                        <path d="M 550 150 L 550 250" stroke="#ffffff" strokeWidth="3" fill="none" />
                        <path d="M 450 130 L 450 250" stroke="#ffffff" strokeWidth="3" fill="none" />
                        <path d="M 350 120 L 350 260" stroke="#ffffff" strokeWidth="3" fill="none" />
                        <path d="M 200 110 L 200 260" stroke="#ffffff" strokeWidth="3" fill="none" />
                        <path d="M 300 140 L 650 140" stroke="#ffffff" strokeWidth="3" fill="none" />
                        <path d="M 280 260 L 700 260" stroke="#ffffff" strokeWidth="3" fill="none" />

                        {/* === 지역경계 (점선) === */}
                        <path d="M 300 0 L 280 420" stroke="#c9bfa8" strokeWidth="1" strokeDasharray="6,4" fill="none" opacity="0.6" />
                        <path d="M 480 0 L 500 420" stroke="#c9bfa8" strokeWidth="1" strokeDasharray="6,4" fill="none" opacity="0.6" />

                        {/* === 지역 라벨 === */}
                        <text x="160" y="150" textAnchor="middle" fill="#8a7e6b" fontSize="16" fontWeight="bold" opacity="0.5">인천</text>
                        <text x="390" y="240" textAnchor="middle" fill="#8a7e6b" fontSize="14" fontWeight="bold" opacity="0.4">부천</text>
                        <text x="550" y="195" textAnchor="middle" fill="#8a7e6b" fontSize="16" fontWeight="bold" opacity="0.5">서울</text>
                        <text x="680" y="320" textAnchor="middle" fill="#8a7e6b" fontSize="14" fontWeight="bold" opacity="0.4">강남</text>
                        <text x="720" y="395" textAnchor="middle" fill="#8a7e6b" fontSize="13" fontWeight="bold" opacity="0.4">성남/판교</text>
                        <text x="620" y="130" textAnchor="middle" fill="#8a7e6b" fontSize="12" fontWeight="bold" opacity="0.35">종로</text>
                        <text x="540" y="340" textAnchor="middle" fill="#8a7e6b" fontSize="12" fontWeight="bold" opacity="0.35">서초</text>

                        {/* === 운송 경로 (계획: 점선 / 이동한: 실선) === */}
                        {transportMonitorData.transports.filter(t => t.status === '운송중').map(t => {
                          const route = vehicleRoutes[t.id];
                          if (!route) return null;
                          const pts = route.path;
                          const planned = `M ${pts[0][0]} ${pts[0][1]} ` + pts.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ');
                          const prog = vehicleAnimProgress[t.id] ?? 0;
                          const totalSeg = pts.length - 1;
                          const segF = prog * totalSeg;
                          const segIdx = Math.min(Math.floor(segF), totalSeg - 1);
                          const localT = segF - segIdx;
                          const traveledPts = pts.slice(0, segIdx + 1);
                          const midX = pts[segIdx][0] + (pts[segIdx+1][0] - pts[segIdx][0]) * localT;
                          const midY = pts[segIdx][1] + (pts[segIdx+1][1] - pts[segIdx][1]) * localT;
                          traveledPts.push([midX, midY]);
                          const traveled = `M ${traveledPts[0][0]} ${traveledPts[0][1]} ` + traveledPts.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ');
                          return (
                            <g key={t.id}>
                              <path d={planned} stroke={route.color} strokeWidth="3" fill="none" strokeDasharray="8,5" opacity="0.3" />
                              <path d={traveled} stroke={route.color} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.85" />
                            </g>
                          );
                        })}

                        {/* === 도착지 마커 (ITAD 처리센터 인천) === */}
                        <circle cx="155" cy="108" r="18" fill="#6366f1" opacity="0.12">
                          <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="155" cy="108" r="10" fill="#6366f1" opacity="0.25" />
                        <circle cx="155" cy="108" r="5" fill="#6366f1" />
                        <text x="155" y="90" textAnchor="middle" fill="#4f46e5" fontSize="10" fontWeight="bold">ITAD 처리센터</text>

                        {/* === 출발지 마커들 === */}
                        {transportMonitorData.transports.filter(t => t.status === '운송중').map(t => {
                          const route = vehicleRoutes[t.id];
                          if (!route) return null;
                          const [sx, sy] = route.path[0];
                          return (
                            <g key={`start-${t.id}`}>
                              <circle cx={sx} cy={sy} r="6" fill="#ffffff" stroke={route.color} strokeWidth="2" />
                              <circle cx={sx} cy={sy} r="2.5" fill={route.color} />
                            </g>
                          );
                        })}

                        {/* === 차량 마커들 (애니메이션 위치) === */}
                        {transportMonitorData.transports.filter(t => t.status === '운송중').map(t => {
                          const pos = getVehiclePos(t.id);
                          const isSelected = selectedTransport === t.id;
                          const route = vehicleRoutes[t.id];
                          const fillColor = route?.color ?? '#10b981';
                          return (
                            <g key={`vehicle-${t.id}`}
                               style={{ cursor: 'pointer' }}
                               onClick={() => setSelectedTransport(t.id)}
                            >
                              {/* 선택 상태 펄스 */}
                              {isSelected && (
                                <>
                                  <circle cx={pos.x} cy={pos.y} r="20" fill={fillColor} opacity="0.15">
                                    <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
                                  </circle>
                                  <circle cx={pos.x} cy={pos.y} r="16" fill="none" stroke={fillColor} strokeWidth="2" opacity="0.4">
                                    <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
                                  </circle>
                                </>
                              )}
                              {/* 차량 아이콘 배경 */}
                              <circle cx={pos.x} cy={pos.y} r="14" fill={fillColor} stroke="#ffffff" strokeWidth="3" />
                              {/* 트럭 아이콘 (심플 SVG) */}
                              <g transform={`translate(${pos.x - 7}, ${pos.y - 6})`}>
                                <rect x="0" y="4" width="10" height="7" rx="1" fill="#ffffff" opacity="0.9" />
                                <path d="M 10 6 L 13 6 L 14 9 L 14 11 L 10 11 Z" fill="#ffffff" opacity="0.9" />
                                <circle cx="3" cy="12" r="1.5" fill={fillColor} stroke="#ffffff" strokeWidth="0.5" />
                                <circle cx="12" cy="12" r="1.5" fill={fillColor} stroke="#ffffff" strokeWidth="0.5" />
                              </g>
                              {/* 차량번호 라벨 */}
                              <rect x={pos.x - 30} y={pos.y - 30} width="60" height="16" rx="4" fill="rgba(15,23,42,0.85)" />
                              <text x={pos.x} y={pos.y - 19} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                                {t.id.replace('TRN-2026-', '')} · {t.driver}
                              </text>
                            </g>
                          );
                        })}

                        {/* === 완료 차량 (도착지 근처) === */}
                        {transportMonitorData.transports.filter(t => t.status === '완료').map((t, i) => (
                          <g key={`done-${t.id}`}>
                            <circle cx={140 + i * 25} cy={130 + i * 10} r="8" fill="#94a3b8" stroke="#ffffff" strokeWidth="2" />
                            <path d={`M ${135 + i * 25} ${130 + i * 10} L ${139 + i * 25} ${134 + i * 10} L ${146 + i * 25} ${126 + i * 10}`} stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
                          </g>
                        ))}
                      </svg>

                      {/* 범례 오버레이 */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-slate-200/50">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                          <span className="flex items-center gap-1"><span className="w-6 h-0.5 bg-emerald-500 inline-block rounded" /> TRN-00051</span>
                          <span className="flex items-center gap-1"><span className="w-6 h-0.5 bg-amber-500 inline-block rounded" /> TRN-00052</span>
                          <span className="flex items-center gap-1"><span className="w-6 h-0.5 bg-indigo-500 inline-block rounded" /> TRN-00053</span>
                        </div>
                      </div>

                      {/* 진행률 오버레이 */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-slate-200/50">
                        <div className="space-y-1.5">
                          {transportMonitorData.transports.filter(t => t.status === '운송중').map(t => {
                            const prog = Math.round((vehicleAnimProgress[t.id] ?? 0) * 100);
                            const route = vehicleRoutes[t.id];
                            return (
                              <div key={t.id} className="flex items-center gap-2 text-[10px]">
                                <span className="font-bold text-slate-600 w-10">{t.id.replace('TRN-2026-', '')}</span>
                                <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${prog}%`, backgroundColor: route?.color ?? '#10b981' }} />
                                </div>
                                <span className="font-bold text-slate-500 w-7 text-right">{prog}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 우측 상세 패널 (1/3) */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <h3 className="text-sm font-bold text-slate-900">운송 상세정보</h3>
                    </div>
                    {selectedTransportData ? (
                      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
                        {/* 운송 기본정보 */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">운송 기본정보</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">운송번호</span>
                              <span className="font-bold text-slate-900">{selectedTransportData.id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">배출신청번호</span>
                              <span className="font-bold text-indigo-600">{selectedTransportData.emissionId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">보안등급</span>
                              <span className={cn(
                                "px-2 py-0.5 rounded-md text-xs font-bold",
                                selectedTransportData.securityGrade === '기밀' ? "bg-purple-100 text-purple-700" :
                                selectedTransportData.securityGrade === '중요' ? "bg-amber-100 text-amber-700" :
                                "bg-slate-100 text-slate-600"
                              )}>{selectedTransportData.securityGrade}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">자산 수량</span>
                              <span className="font-bold text-slate-900">{selectedTransportData.assetCount}대</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">운송기사</span>
                              <span className="font-bold text-slate-900">{selectedTransportData.driver}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">차량</span>
                              <span className="font-bold text-slate-700 text-xs">{selectedTransportData.vehicle}</span>
                            </div>
                          </div>
                        </div>

                        {/* 정합성 결과 요약 */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">정합성 결과</h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2 bg-emerald-50 rounded-lg text-center">
                              <p className="text-lg font-black text-emerald-700">{selectedTransportData.integrityResult.matched}</p>
                              <p className="text-[10px] font-bold text-emerald-600">일치</p>
                            </div>
                            <div className="p-2 bg-amber-50 rounded-lg text-center">
                              <p className="text-lg font-black text-amber-700">{selectedTransportData.integrityResult.mismatched}</p>
                              <p className="text-[10px] font-bold text-amber-600">불일치</p>
                            </div>
                            <div className="p-2 bg-rose-50 rounded-lg text-center">
                              <p className="text-lg font-black text-rose-700">{selectedTransportData.integrityResult.unregistered}</p>
                              <p className="text-[10px] font-bold text-rose-600">미등록</p>
                            </div>
                          </div>
                          {selectedTransportData.integrityResult.mismatched > 0 && (
                            <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-bold flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              불일치 건이 포함되어 있습니다
                            </div>
                          )}
                        </div>

                        {/* 운송 타임라인 */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">운송 타임라인</h4>
                          <div className="space-y-0">
                            {selectedTransportData.timeline.map((step, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                  <div className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center border-2",
                                    step.done && step.active ? "bg-indigo-600 border-indigo-600" :
                                    step.done ? "bg-emerald-500 border-emerald-500" :
                                    "bg-white border-slate-200"
                                  )}>
                                    {step.done && !step.active && <Check className="w-3.5 h-3.5 text-white" />}
                                    {step.active && <Radio className="w-3.5 h-3.5 text-white" />}
                                    {!step.done && <div className="w-2 h-2 rounded-full bg-slate-200" />}
                                  </div>
                                  {i < selectedTransportData.timeline.length - 1 && (
                                    <div className={cn(
                                      "w-0.5 h-8",
                                      step.done ? "bg-emerald-300" : "bg-slate-200"
                                    )} />
                                  )}
                                </div>
                                <div className="pt-1">
                                  <p className={cn(
                                    "text-sm font-bold",
                                    step.active ? "text-indigo-600" : step.done ? "text-slate-900" : "text-slate-400"
                                  )}>{step.step}</p>
                                  <p className="text-xs text-slate-400">{step.time || '—'}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 보안 상태 */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">보안 상태</h4>
                          <div className="space-y-2">
                            {[
                              { label: '봉인 상태', value: selectedTransportData.sealStatus, icon: Lock, ok: selectedTransportData.sealStatus === '정상' },
                              { label: '경로 준수', value: '정상', icon: Route, ok: true },
                              { label: '차량 잠금', value: '잠금', icon: Shield, ok: true },
                            ].map((sec, i) => (
                              <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <sec.icon className="w-4 h-4" />
                                  {sec.label}
                                </div>
                                <span className={cn(
                                  "px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                  sec.ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                )}>
                                  {sec.ok ? '✅' : '⚠️'} {sec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 증빙 자료 */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">증빙 자료</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-sm">
                              <span className="text-slate-600 flex items-center gap-2"><Camera className="w-4 h-4" /> 상차 사진</span>
                              <span className="text-indigo-600 font-bold text-xs cursor-pointer hover:underline">2장 보기</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-sm">
                              <span className="text-slate-600 flex items-center gap-2"><PenTool className="w-4 h-4" /> 서명</span>
                              <span className="text-indigo-600 font-bold text-xs cursor-pointer hover:underline">확인됨</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-sm">
                              <span className="text-slate-600 flex items-center gap-2"><Hash className="w-4 h-4" /> 봉인번호</span>
                              <span className="font-mono font-bold text-slate-900 text-xs">{selectedTransportData.sealNumber}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-slate-400 text-sm p-8 text-center">
                        지도에서 차량 마커를 클릭하면<br />상세 정보가 표시됩니다.
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== 하단: 운송 목록 테이블 ===== */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                    <h3 className="text-lg font-bold text-slate-900">운송 목록</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['전체', '운송중', '완료', '예정'].map(f => (
                          <button
                            key={f}
                            onClick={() => setTransportFilter(f)}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                              transportFilter === f ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
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
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">운송번호</th>
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">배출신청번호</th>
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">보안등급</th>
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">출발지 → 도착지</th>
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">자산 수량</th>
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">현재 상태</th>
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">봉인 상태</th>
                          <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">예상 도착</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transportMonitorData.transports
                          .filter(t => transportFilter === '전체' || t.status === transportFilter)
                          .map(t => (
                          <tr
                            key={t.id}
                            onClick={() => setSelectedTransport(t.id)}
                            className={cn(
                              "cursor-pointer transition-colors hover:bg-indigo-50/50",
                              selectedTransport === t.id ? "bg-indigo-50/70" : ""
                            )}
                          >
                            <td className="px-5 py-3 text-sm font-bold text-slate-900">{t.id}</td>
                            <td className="px-5 py-3 text-sm text-indigo-600 font-bold">{t.emissionId}</td>
                            <td className="px-5 py-3">
                              <span className={cn(
                                "px-2 py-0.5 rounded-md text-[11px] font-bold",
                                t.securityGrade === '기밀' ? "bg-purple-100 text-purple-700" :
                                t.securityGrade === '중요' ? "bg-amber-100 text-amber-700" :
                                "bg-slate-100 text-slate-600"
                              )}>{t.securityGrade}</span>
                            </td>
                            <td className="px-5 py-3 text-sm text-slate-600">
                              <span className="truncate max-w-[120px] inline-block">{t.from.split(' ').slice(0,2).join(' ')}</span>
                              <span className="text-slate-400 mx-1">→</span>
                              <span>{t.to.split(' ').slice(-1)}</span>
                            </td>
                            <td className="px-5 py-3 text-sm">
                              <span className="font-bold text-slate-900">{t.assetCount}대</span>
                              <span className="text-slate-400 text-xs ml-1">(일치 {t.matchedCount})</span>
                            </td>
                            <td className="px-5 py-3">
                              <span className={cn(
                                "px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                t.status === '운송중' ? "bg-blue-100 text-blue-700" :
                                t.status === '완료' ? "bg-emerald-100 text-emerald-700" :
                                "bg-slate-100 text-slate-500"
                              )}>{t.status}</span>
                            </td>
                            <td className="px-5 py-3">
                              <span className={cn(
                                "px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                t.sealStatus === '정상' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                              )}>
                                {t.sealStatus === '정상' ? '✅' : '⚠️'} {t.sealStatus}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-sm text-slate-600 font-bold">{t.estimatedArrival}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ===== 알림 센터 ===== */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-indigo-600" />
                      알림
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {transportMonitorData.alerts.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-sm">현재 알림이 없습니다.</div>
                    ) : (
                      transportMonitorData.alerts.map(alert => (
                        <div key={alert.id} className="px-5 py-3 flex items-center gap-4">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            alert.severity === 'critical' ? "bg-rose-100" :
                            alert.severity === 'warning' ? "bg-amber-100" :
                            "bg-emerald-100"
                          )}>
                            {alert.severity === 'critical' ? <AlertCircle className="w-4 h-4 text-rose-600" /> :
                             alert.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-600" /> :
                             <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900">{alert.type}</p>
                            <p className="text-xs text-slate-500">{alert.transport}</p>
                          </div>
                          <span className="text-xs text-slate-400 font-bold">{alert.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : (
            /* =============== PHASE 1: 정합성 확인 =============== */
            <>
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Truck className="w-8 h-8 text-indigo-600" />
                보안운송 — 자산 정합성 확인
              </h1>
              <p className="text-slate-500 mt-1">배출신청 자산의 바코드를 스캔하여 정합성을 확인하고, 운송을 시작합니다.</p>
            </div>

            {/* ===== 상단 영역 — 배출신청 정보 ===== */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  배출신청 정보
                </h2>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedEmissionId}
                    onChange={(e) => setSelectedEmissionId(e.target.value)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                  >
                    <option value="DSP-2026-00123">DSP-2026-00123</option>
                    <option value="DSP-2026-00124">DSP-2026-00124</option>
                    <option value="DSP-2026-00125">DSP-2026-00125</option>
                  </select>
                  <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all">
                    <QrCode className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">배출신청번호</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{emissionRequestInfo.id}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">신청 기업 / 부서</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{emissionRequestInfo.company}</p>
                  <p className="text-xs text-slate-500">{emissionRequestInfo.department}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">신청일</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{emissionRequestInfo.requestDate}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">총 신청 자산 수</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{emissionRequestInfo.totalAssets}대</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">수거지</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{emissionRequestInfo.address}</p>
                  <p className="text-xs text-slate-500">{emissionRequestInfo.addressDetail}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">보안등급</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold">{emissionRequestInfo.securityGrade}</span>
                </div>
              </div>
            </div>

            {/* ===== 메인 영역 — 바코드 스캔 체크 ===== */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Scan className="w-5 h-5 text-indigo-600" />
                  바코드 스캔 체크
                </h2>
                <div className="flex items-center gap-4">
                  {/* Continuous Scan Toggle */}
                  <button
                    onClick={() => setContinuousScan(!continuousScan)}
                    className="flex items-center gap-2 text-sm font-bold text-slate-600"
                  >
                    {continuousScan ? <ToggleRight className="w-6 h-6 text-indigo-600" /> : <ToggleLeft className="w-6 h-6 text-slate-400" />}
                    연속 스캔
                  </button>
                  <button
                    onClick={resetIntegrityCheck}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    초기화
                  </button>
                </div>
              </div>

              {/* Scan Input */}
              <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="relative flex-1">
                  <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    ref={scanInputRef}
                    type="text"
                    placeholder="바코드를 스캔하거나 시리얼 번호를 입력하세요..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-mono text-lg"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleScan(scanInput)}
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => handleScan(scanInput)}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <Scan className="w-5 h-5" />
                  스캔
                </button>
                <button
                  onClick={() => {
                    const demoSn = integrityAssets.find(a => a.status === 'pending')?.sn;
                    if (demoSn) handleScan(demoSn);
                  }}
                  className="px-6 py-4 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-100 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  데모
                </button>
              </div>

              {/* Scan Feedback Flash */}
              <AnimatePresence>
                {scanFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "p-4 rounded-xl border-2 flex items-center gap-3",
                      scanFeedback.status === 'matched' ? "bg-emerald-50 border-emerald-300 text-emerald-800" :
                      scanFeedback.status === 'mismatched' ? "bg-amber-50 border-amber-300 text-amber-800" :
                      scanFeedback.status === 'unregistered' ? "bg-rose-50 border-rose-300 text-rose-800" :
                      "bg-slate-50 border-slate-300 text-slate-600"
                    )}
                  >
                    <span className="text-2xl">
                      {scanFeedback.status === 'matched' ? '✅' : scanFeedback.status === 'mismatched' ? '⚠️' : scanFeedback.status === 'unregistered' ? '❌' : '🔄'}
                    </span>
                    <div>
                      <p className="font-bold">{scanFeedback.status === 'matched' ? '일치' : scanFeedback.status === 'mismatched' ? '불일치' : scanFeedback.status === 'unregistered' ? '미등록' : '중복 스캔'}</p>
                      <p className="text-sm">[{scanFeedback.sn}] {scanFeedback.message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Recent Scan Feed */}
              {scanLog.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">최근 스캔 로그</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {scanLog.slice(0, 5).map((log, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg text-sm">
                        <span>{log.status === 'matched' ? '✅' : log.status === 'mismatched' ? '⚠️' : log.status === 'unregistered' ? '❌' : '🔄'}</span>
                        <span className="font-mono text-slate-700">{log.sn}</span>
                        <span className="text-slate-400">→</span>
                        <span className="font-bold text-slate-600">{log.assetId}</span>
                        <span className="ml-auto text-xs text-slate-400">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ===== 정합성 체크 현황 보드 ===== */}
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-700">정합성 체크 진행률</h3>
                  <span className="text-sm font-bold text-slate-900">{scannedCount} / {integrityAssets.length}대 완료 ({integrityAssets.length > 0 ? ((scannedCount / integrityAssets.length) * 100).toFixed(1) : 0}%)</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${integrityAssets.length > 0 ? (scannedCount / integrityAssets.length) * 100 : 0}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>

              {/* Summary Counters (4 cards) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '스캔 완료', value: scannedCount, icon: CheckCircle2, color: 'indigo', unit: '대' },
                  { label: '일치', value: matchedCount, icon: Check, color: 'emerald', unit: '대' },
                  { label: '불일치', value: mismatchedCount, icon: AlertTriangle, color: 'amber', unit: '대' },
                  { label: '미등록', value: unregisteredCount, icon: AlertCircle, color: 'rose', unit: '대' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center",
                        stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                        stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                        stat.color === 'amber' ? "bg-amber-50 text-amber-600" :
                        "bg-rose-50 text-rose-600"
                      )}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-500">{stat.label}</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{stat.value}<span className="text-sm font-bold text-slate-400 ml-1">{stat.unit}</span></p>
                  </div>
                ))}
              </div>

              {/* Asset Check List Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-lg font-bold text-slate-900">자산 체크 목록</h3>
                  <div className="flex items-center gap-3">
                    {/* Filter by scan status */}
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      {['전체', '일치', '불일치', '미등록', '미스캔'].map(f => (
                        <button
                          key={f}
                          onClick={() => setScanFilter(f)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                            scanFilter === f ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="자산번호 / 시리얼 검색"
                        value={scanSearch}
                        onChange={(e) => setScanSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 w-48"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">No.</th>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">자산번호</th>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">자산 유형</th>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">제조사 / 모델</th>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">시리얼 넘버</th>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">스캔 상태</th>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">스캔 시각</th>
                        <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">비고</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {integrityAssets
                        .filter(a => {
                          if (scanFilter === '일치') return a.status === 'matched';
                          if (scanFilter === '불일치') return a.status === 'mismatched';
                          if (scanFilter === '미스캔') return a.status === 'pending';
                          return true;
                        })
                        .filter(a => {
                          if (!scanSearch) return true;
                          return a.id.toLowerCase().includes(scanSearch.toLowerCase()) || a.sn.toLowerCase().includes(scanSearch.toLowerCase());
                        })
                        .map((asset, i) => (
                        <tr key={asset.id} className={cn(
                          "transition-colors",
                          asset.status === 'matched' ? "bg-emerald-50/30" :
                          asset.status === 'mismatched' ? "bg-amber-50/30" :
                          asset.status === 'pending' ? "" : ""
                        )}>
                          <td className="px-5 py-3 text-sm text-slate-500">{i + 1}</td>
                          <td className="px-5 py-3 text-sm font-bold text-slate-900">{asset.id}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{asset.type}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{asset.manufacturer} {asset.model}</td>
                          <td className="px-5 py-3 text-sm font-mono text-slate-600">{asset.sn}</td>
                          <td className="px-5 py-3">
                            <span className={cn(
                              "px-2.5 py-1 rounded-lg text-[11px] font-bold",
                              asset.status === 'matched' ? "bg-emerald-100 text-emerald-700" :
                              asset.status === 'mismatched' ? "bg-amber-100 text-amber-700" :
                              "bg-slate-100 text-slate-400"
                            )}>
                              {asset.status === 'matched' ? '✅ 일치' : asset.status === 'mismatched' ? '⚠️ 불일치' : '○ 미스캔'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-500">{asset.scanTime || '-'}</td>
                          <td className="px-5 py-3 text-sm text-slate-500">
                            {asset.remark || '-'}
                            {asset.status === 'pending' && (
                              <button
                                onClick={() => setMismatchModal({ open: true, assetId: asset.id, sn: asset.sn })}
                                className="ml-2 text-xs text-amber-600 hover:underline font-bold"
                              >
                                불일치 처리
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ===== 하단 — 정합성 확인 완료 액션 ===== */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  {!allScanned && (
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      미스캔 <span className="font-bold text-amber-600">{integrityAssets.length - scannedCount}건</span> 남음
                    </p>
                  )}
                  {allScanned && !hasIssues && (
                    <p className="text-sm text-emerald-600 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      전체 스캔 완료 — 이상 없음
                    </p>
                  )}
                  {allScanned && hasIssues && (
                    <p className="text-sm text-amber-600 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      전체 스캔 완료 — 불일치 {mismatchedCount}건, 미등록 {unregisteredCount}건
                    </p>
                  )}
                </div>
                <button
                  onClick={() => allScanned && setShowTransportStartPopup(true)}
                  disabled={!allScanned}
                  className={cn(
                    "px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3",
                    !allScanned ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
                    hasIssues ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20" :
                    "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                  )}
                >
                  <Truck className="w-6 h-6" />
                  {!allScanned ? '운송 시작' : hasIssues ? '이상 건 확인 후 운송 시작' : '운송 시작'}
                </button>
              </div>
            </div>

            {/* ===== 운송 시작 확인 팝업 ===== */}
            <AnimatePresence>
              {showTransportStartPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowTransportStartPopup(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                  >
                    <div className="p-6 border-b border-slate-100 bg-slate-50">
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <Truck className="w-6 h-6 text-indigo-600" />
                        운송 시작 확인
                      </h3>
                    </div>
                    <div className="p-6 space-y-5">
                      {/* Integrity Summary */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-700">정합성 요약</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-emerald-50 rounded-xl text-center">
                            <p className="text-2xl font-black text-emerald-700">{matchedCount}</p>
                            <p className="text-xs font-bold text-emerald-600">일치</p>
                          </div>
                          <div className="p-3 bg-amber-50 rounded-xl text-center">
                            <p className="text-2xl font-black text-amber-700">{mismatchedCount}</p>
                            <p className="text-xs font-bold text-amber-600">불일치</p>
                          </div>
                          <div className="p-3 bg-rose-50 rounded-xl text-center">
                            <p className="text-2xl font-black text-rose-700">{unregisteredCount}</p>
                            <p className="text-xs font-bold text-rose-600">미등록</p>
                          </div>
                        </div>
                      </div>

                      {/* Seal Number */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">봉인번호 입력</label>
                        <input
                          type="text"
                          placeholder="컨테이너 봉인번호를 스캔 또는 직접 입력"
                          value={sealNumber}
                          onChange={(e) => setSealNumber(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-mono"
                        />
                      </div>

                      {/* Loading Photo */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">상차 사진</label>
                        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all flex items-center justify-center gap-2">
                          <Camera className="w-5 h-5" />
                          촬영 또는 업로드
                        </button>
                      </div>

                      {/* Signatures */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">현장 담당자 서명</label>
                          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                            <PenTool className="w-4 h-4 mr-2" />
                            전자서명
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">ITAD 기사 서명</label>
                          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                            <PenTool className="w-4 h-4 mr-2" />
                            전자서명
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                      <button
                        onClick={() => setShowTransportStartPopup(false)}
                        className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => {
                          setShowTransportStartPopup(false);
                          setTransportPhase('monitoring');
                        }}
                        disabled={!sealNumber}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                          sealNumber ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                      >
                        <Truck className="w-5 h-5" />
                        운송 시작 확정
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== 불일치 처리 모달 ===== */}
            <AnimatePresence>
              {mismatchModal.open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                  onClick={() => setMismatchModal({ open: false, assetId: '', sn: '' })}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                  >
                    <div className="p-6 border-b border-slate-100 bg-amber-50">
                      <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        불일치 / 미등록 건 처리
                      </h3>
                      <p className="text-sm text-amber-700 mt-1">자산: {mismatchModal.assetId} ({mismatchModal.sn})</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">불일치 사유</label>
                        <select
                          value={mismatchReason}
                          onChange={(e) => setMismatchReason(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500"
                        >
                          <option>시리얼 다름</option>
                          <option>모델 다름</option>
                          <option>외관상태 다름</option>
                          <option>기타</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">현장 사진 촬영</label>
                        <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-amber-300 hover:text-amber-500 transition-all flex items-center justify-center gap-2">
                          <Camera className="w-4 h-4" />
                          촬영 / 업로드
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">현장 메모</label>
                        <textarea
                          value={mismatchMemo}
                          onChange={(e) => setMismatchMemo(e.target.value)}
                          placeholder="현장 상황을 메모하세요..."
                          className="w-full h-20 px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">처리 방법</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['그대로 포함', '별도 보류', '반송'].map(action => (
                            <button
                              key={action}
                              onClick={() => setMismatchAction(action)}
                              className={cn(
                                "py-2.5 rounded-xl border-2 text-sm font-bold transition-all",
                                mismatchAction === action ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-100 text-slate-500"
                              )}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                      <button
                        onClick={() => setMismatchModal({ open: false, assetId: '', sn: '' })}
                        className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleMismatch(mismatchModal.assetId, mismatchModal.sn)}
                        className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all"
                      >
                        처리 완료
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            </>
            )}
          </motion.div>
        );
      case 'disposal':
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
              <p className="text-slate-500 mt-1">배출된 IT자산의 데이터가 어떤 방식으로, 언제, 누구에 의해 파괴되었는지 전 과정을 투명하게 보여줍니다.</p>
            </div>

            {/* ===== 상단 요약 카드 4개 ===== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '총 폐기 처리 건수', value: `${disposalTotalCount + 148}`, sub: `금월 ${disposalTotalCount}건 · 전월 대비 +12%`, icon: Database, color: 'indigo' },
                { label: '폐기 완료율', value: `${disposalCompletionRate}%`, sub: `요청 ${disposalTotalCount}건 중 ${disposalCompletedCount}건 완료`, icon: CheckCircle2, color: 'emerald', gauge: disposalCompletionRate },
                { label: '인증서 발급 건수', value: `${disposalCerts.length}`, sub: '누적 CoD 발급', icon: FileBadge, color: 'blue' },
                { label: '처리 대기 건수', value: `${disposalPendingCount}`, sub: disposalPendingCount === 0 ? '전체 완료' : `${disposalAssets.filter(a => a.delayed).length}건 지연`, icon: Clock, color: disposalPendingCount === 0 ? 'emerald' : disposalAssets.filter(a => a.delayed).length > 0 ? 'rose' : 'amber' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      card.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                      card.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                      card.color === 'blue' ? "bg-blue-50 text-blue-600" :
                      card.color === 'amber' ? "bg-amber-50 text-amber-600" :
                      "bg-rose-50 text-rose-600"
                    )}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-500">{card.label}</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{card.value}</p>
                  {card.gauge !== undefined && (
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${card.gauge}%` }} />
                    </div>
                  )}
                  <p className={cn("text-xs font-bold mt-1", card.color === 'rose' ? "text-rose-500" : "text-slate-400")}>{card.sub}</p>
                </div>
              ))}
            </div>

            {/* ===== 탭 메뉴 ===== */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200">
                {[
                  { key: 'progress' as const, label: '폐기 진행 현황' },
                  { key: 'detail' as const, label: '폐기 상세 리포트' },
                  { key: 'certificates' as const, label: '인증서 관리' },
                  { key: 'stats' as const, label: '통계 · 분석' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => { setDisposalTab(tab.key); if (tab.key !== 'detail') setSelectedDisposalAsset(null); }}
                    className={cn(
                      "flex-1 py-4 text-sm font-bold transition-all border-b-2",
                      disposalTab === tab.key ? "text-indigo-600 border-indigo-600 bg-indigo-50/50" : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* ===== 탭①: 폐기 진행 현황 ===== */}
                {disposalTab === 'progress' && (
                  <div className="space-y-6">
                    {/* 프로세스 타임라인 (가로 스텝) */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-2">
                      <button
                        onClick={() => setDisposalStepFilter('전체')}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
                          disposalStepFilter === '전체' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        )}
                      >전체</button>
                      {disposalSteps.map((step, i) => {
                        const count = disposalAssets.filter(a => a.step === step).length;
                        return (
                          <React.Fragment key={step}>
                            <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                            <button
                              onClick={() => setDisposalStepFilter(step)}
                              className={cn(
                                "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2",
                                disposalStepFilter === step ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                              )}
                            >
                              {step}
                              {count > 0 && <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]", disposalStepFilter === step ? "bg-white/20" : "bg-slate-200")}>{count}</span>}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* 필터바 */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="배출신청번호 / 자산번호 검색"
                          value={disposalSearch}
                          onChange={(e) => setDisposalSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                        />
                      </div>
                      <select
                        value={disposalMethodFilter}
                        onChange={(e) => setDisposalMethodFilter(e.target.value)}
                        className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none"
                      >
                        <option value="전체">폐기 방식: 전체</option>
                        <option>소프트웨어 삭제</option>
                        <option>디가우징</option>
                        <option>물리파괴</option>
                        <option>복합처리</option>
                      </select>
                      <button
                        onClick={() => setDisposalDelayOnly(!disposalDelayOnly)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all",
                          disposalDelayOnly ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-white border-slate-200 text-slate-500"
                        )}
                      >
                        {disposalDelayOnly ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                        지연 건만
                      </button>
                    </div>

                    {/* 자산별 폐기 목록 테이블 */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산번호</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">자산 유형</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">모델명</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">저장매체</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">용량</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">폐기 방식</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">현재 단계</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">담당자</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">처리 예정일</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">인증서</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {disposalAssets
                            .filter(a => disposalStepFilter === '전체' || a.step === disposalStepFilter)
                            .filter(a => disposalMethodFilter === '전체' || a.method === disposalMethodFilter)
                            .filter(a => !disposalDelayOnly || a.delayed)
                            .filter(a => {
                              if (!disposalSearch) return true;
                              const q = disposalSearch.toLowerCase();
                              return a.assetId.toLowerCase().includes(q) || a.emissionId.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
                            })
                            .map(asset => (
                            <tr
                              key={asset.id}
                              onClick={() => { setSelectedDisposalAsset(asset.id); setDisposalTab('detail'); }}
                              className="cursor-pointer hover:bg-indigo-50/50 transition-colors"
                            >
                              <td className="px-4 py-3 text-sm font-bold text-slate-900">{asset.assetId}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{asset.type}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{asset.model}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                                  asset.mediaType === 'HDD' ? "bg-blue-100 text-blue-700" :
                                  asset.mediaType === 'SSD' ? "bg-purple-100 text-purple-700" :
                                  "bg-amber-100 text-amber-700"
                                )}>{asset.mediaType}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-slate-600">{asset.capacity}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{asset.method}</td>
                              <td className="px-4 py-3">
                                <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                  asset.step === '완료' ? "bg-emerald-100 text-emerald-700" :
                                  asset.step === '폐기 수행' || asset.step === '검증' ? "bg-blue-100 text-blue-700" :
                                  "bg-slate-100 text-slate-600"
                                )}>{asset.step}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-slate-600">{asset.operator || '—'}</td>
                              <td className={cn("px-4 py-3 text-sm font-bold", asset.delayed ? "text-rose-500" : "text-slate-600")}>{asset.scheduledDate}</td>
                              <td className="px-4 py-3">
                                {asset.certId ? (
                                  <button onClick={(e) => { e.stopPropagation(); }} className="text-indigo-600 hover:underline text-xs font-bold flex items-center gap-1">
                                    <Download className="w-3 h-3" /> PDF
                                  </button>
                                ) : <span className="text-xs text-slate-400">—</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ===== 탭②: 폐기 상세 리포트 ===== */}
                {disposalTab === 'detail' && (
                  <div>
                    {selectedDisposalData ? (
                      <div className="space-y-6">
                        <button onClick={() => { setDisposalTab('progress'); setSelectedDisposalAsset(null); }} className="text-sm text-slate-500 hover:text-slate-700 font-bold flex items-center gap-1">
                          <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* 기본 정보 */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">기본 정보</h4>
                            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                              {[
                                { label: '배출신청번호', value: selectedDisposalData.emissionId, link: true },
                                { label: '운송번호', value: selectedDisposalData.transportId, link: true },
                                { label: '의뢰 기업 / 부서', value: `${selectedDisposalData.company} / ${selectedDisposalData.department}` },
                                { label: '보안등급', value: selectedDisposalData.securityGrade, badge: true },
                              ].map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                  <span className="text-slate-500">{item.label}</span>
                                  {item.badge ? (
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md text-xs font-bold">{item.value}</span>
                                  ) : item.link ? (
                                    <span className="text-indigo-600 font-bold cursor-pointer hover:underline">{item.value}</span>
                                  ) : (
                                    <span className="font-bold text-slate-900">{item.value}</span>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* 저장매체 정보 */}
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">저장매체 정보</h4>
                            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                              {[
                                { label: '매체 유형', value: selectedDisposalData.mediaType },
                                { label: '제조사 / 모델', value: selectedDisposalData.mediaModel },
                                { label: '시리얼 넘버', value: selectedDisposalData.serialNumber, mono: true },
                                { label: '용량', value: selectedDisposalData.capacity },
                                { label: '매체 상태', value: selectedDisposalData.mediaStatus },
                              ].map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                  <span className="text-slate-500">{item.label}</span>
                                  <span className={cn("font-bold", item.mono ? "font-mono text-slate-700" :
                                    item.value === '정상' ? "text-emerald-600" : item.value === '배드섹터' ? "text-amber-600" : item.value === '인식불가' ? "text-rose-600" : "text-slate-900"
                                  )}>{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 폐기 수행 기록 */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">폐기 수행 기록</h4>
                            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                              {[
                                { label: '폐기 방식', value: selectedDisposalData.method },
                                { label: '적용 기준', value: selectedDisposalData.standard || '—' },
                                { label: '삭제 소프트웨어', value: selectedDisposalData.software || '—' },
                                { label: '삭제 알고리즘', value: selectedDisposalData.algorithm || '—' },
                                { label: '처리 시작 일시', value: selectedDisposalData.startDate || '—' },
                                { label: '처리 완료 일시', value: selectedDisposalData.endDate || '—' },
                                { label: '처리 소요시간', value: selectedDisposalData.duration || '—' },
                                { label: '담당 기사', value: selectedDisposalData.operator ? `${selectedDisposalData.operator} (${selectedDisposalData.operatorCert})` : '—' },
                                { label: '검증 결과', value: selectedDisposalData.verification || '—', verify: true },
                              ].map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                  <span className="text-slate-500">{item.label}</span>
                                  {item.verify ? (
                                    <span className={cn("font-bold", item.value === 'Pass' ? "text-emerald-600" : item.value === 'Fail' ? "text-rose-600" : "text-slate-400")}>
                                      {item.value === 'Pass' ? '✅ Pass' : item.value === 'Fail' ? '❌ Fail' : item.value}
                                    </span>
                                  ) : (
                                    <span className="font-bold text-slate-900">{item.value}</span>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* 증빙 자료 */}
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">증빙 자료</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label: '폐기 전 사진', icon: Image, desc: '매체 식별 사진' },
                                { label: '폐기 후 사진', icon: Image, desc: '파쇄 결과물 사진' },
                                { label: '삭제 로그', icon: FileText, desc: '로그파일 첨부' },
                                { label: '영상 기록', icon: Video, desc: '물리파괴 영상' },
                              ].map((item, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer group">
                                  <div className="flex items-center gap-2 mb-1">
                                    <item.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                                  </div>
                                  <p className="text-xs text-slate-400">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Clipboard className="w-12 h-12 mb-4 text-slate-300" />
                        <p className="text-sm font-bold">폐기 진행 현황 탭에서 자산을 선택하면</p>
                        <p className="text-sm">상세 리포트가 표시됩니다.</p>
                        <button onClick={() => setDisposalTab('progress')} className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all">
                          폐기 진행 현황으로 이동
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ===== 탭③: 인증서 관리 ===== */}
                {disposalTab === 'certificates' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-500">총 <span className="font-bold text-slate-900">{disposalCerts.length}</span>건</p>
                      <button
                        onClick={() => {}}
                        disabled={certChecked.length === 0}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all",
                          certChecked.length > 0 ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        )}
                      >
                        <Download className="w-4 h-4" />
                        일괄 다운로드 ({certChecked.length})
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 w-10">
                              <input
                                type="checkbox"
                                checked={certChecked.length === disposalCerts.length}
                                onChange={(e) => setCertChecked(e.target.checked ? disposalCerts.map(c => c.id) : [])}
                                className="rounded border-slate-300"
                              />
                            </th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">인증서 번호</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">배출신청번호</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">대상 자산 수</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">폐기 방식</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">적용 기준</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">발급일</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">유효 상태</th>
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
                              <td className="px-4 py-3 text-sm text-indigo-600 font-bold">{cert.emissionId}</td>
                              <td className="px-4 py-3 text-sm text-slate-900 font-bold">{cert.assetCount}건</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{cert.method}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{cert.standard}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{cert.issueDate}</td>
                              <td className="px-4 py-3">
                                <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                  cert.status === '유효' ? "bg-emerald-100 text-emerald-700" :
                                  cert.status === '만료' ? "bg-slate-100 text-slate-500" :
                                  "bg-amber-100 text-amber-700"
                                )}>{cert.status}</span>
                              </td>
                              <td className="px-4 py-3">
                                <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all flex items-center gap-1">
                                  <Download className="w-3 h-3" /> PDF
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

                    {/* 보안등급별 처리 현황 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-700">보안등급별 처리 현황</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {disposalSecurityData.map((item, i) => (
                          <div key={i} className="bg-slate-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className={cn("px-2 py-0.5 rounded-md text-xs font-bold",
                                item.grade === '극비' ? "bg-rose-100 text-rose-700" :
                                item.grade === '기밀' ? "bg-purple-100 text-purple-700" :
                                item.grade === '중요' ? "bg-amber-100 text-amber-700" :
                                "bg-slate-200 text-slate-600"
                              )}>{item.grade}</span>
                              <span className="text-xs font-bold text-slate-400">{Math.round((item.completed / item.total) * 100)}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(item.completed / item.total) * 100}%` }} />
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-slate-500">
                              <span>완료 {item.completed}</span>
                              <span>총 {item.total}</span>
                            </div>
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

      case 'processing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 pb-20"
          >
            {/* 헤더 */}
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <Cog className="w-8 h-8 text-orange-600" />
                  자산 처리
                </h1>
                <p className="text-slate-500 mt-1">데이터 폐기 완료 후 IT자산의 분해 → 분류 → 최종 처분 과정을 관리합니다.</p>
              </div>
            </div>

            {/* 파이프라인 요약 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '분해 대기', value: assetProcessingData.summary.awaiting, icon: Clock, color: 'slate' },
                { label: '분해중', value: assetProcessingData.summary.disassembling, icon: Wrench, color: 'amber' },
                { label: '분류 완료', value: assetProcessingData.summary.sorted, icon: Layers, color: 'blue' },
                { label: '처분 완료', value: assetProcessingData.summary.disposed, icon: CheckCircle2, color: 'emerald' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center",
                      card.color === 'amber' ? "bg-amber-50 text-amber-600" :
                      card.color === 'blue' ? "bg-blue-50 text-blue-600" :
                      card.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                      "bg-slate-50 text-slate-600"
                    )}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{card.label}</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{card.value}<span className="text-sm font-bold text-slate-400 ml-1">건</span></p>
                </div>
              ))}
            </div>

            {/* 처분 경로 비율 바 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-700">처분 경로 비율 (누적)</span>
                <span className="text-xs text-slate-400">총 {assetProcessingData.summary.totalParts}개 부품</span>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
                <div className="bg-blue-500 rounded-l-full" style={{ width: `${assetProcessingData.summary.reuseRate}%` }} />
                <div className="bg-emerald-500" style={{ width: `${assetProcessingData.summary.recycleRate}%` }} />
                <div className="bg-rose-400 rounded-r-full" style={{ width: `${assetProcessingData.summary.wasteRate}%` }} />
              </div>
              <div className="flex gap-6 mt-2 text-xs font-bold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" /> 재사용/부품회수 {assetProcessingData.summary.reuseRate}%</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> 재활용 {assetProcessingData.summary.recycleRate}%</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-400" /> 폐기 {assetProcessingData.summary.wasteRate}%</span>
              </div>
            </div>

            {/* 탭 */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
              {([
                { key: 'status' as const, label: '처리 현황', icon: ClipboardList },
                { key: 'disassembly' as const, label: '분해/분류', icon: Layers },
                { key: 'disposition' as const, label: '처분 경로', icon: GitBranch },
                { key: 'stats' as const, label: '처분 통계', icon: BarChart3 },
              ]).map(tab => (
                <button key={tab.key} onClick={() => { setProcessingTab(tab.key); setSelectedProcessingAsset(null); }}
                  className={cn("flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                    processingTab === tab.key ? "bg-white text-orange-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}>
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>

            {/* ===== 탭1: 처리 현황 ===== */}
            {processingTab === 'status' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl">
                    {['전체', '분해대기', '분해중', '분류완료', '처분완료'].map(f => (
                      <button key={f} onClick={() => setProcessingFilter(f)}
                        className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          processingFilter === f ? "bg-orange-600 text-white" : "text-slate-500 hover:bg-slate-50"
                        )}>{f}</button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 font-bold text-slate-600">처리번호</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">자산</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">단계</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">분해 부품</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">착수일</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">담당</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-600">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProcessingAssets.map(a => (
                        <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-bold text-orange-700">{a.id}</td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-700">{a.model}</span>
                            <p className="text-[11px] text-slate-400">{a.type} · {a.assetId}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                              a.stage === '분해대기' ? "bg-slate-100 text-slate-600" :
                              a.stage === '분해중' ? "bg-amber-100 text-amber-700" :
                              a.stage === '분류완료' ? "bg-blue-100 text-blue-700" :
                              "bg-emerald-100 text-emerald-700"
                            )}>{a.stage}</span>
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-700">{a.parts.length > 0 ? `${a.parts.length}개` : '—'}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{a.startDate || '—'}</td>
                          <td className="px-4 py-3 text-slate-600 text-xs font-bold">{a.operator || '미배정'}</td>
                          <td className="px-4 py-3">
                            {a.parts.length > 0 && (
                              <button onClick={() => { setProcessingTab('disassembly'); setSelectedProcessingAsset(a.id); }}
                                className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-[11px] font-bold hover:bg-orange-100 transition-all">
                                부품 상세
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===== 탭2: 분해/분류 ===== */}
            {processingTab === 'disassembly' && (
              <div className="space-y-4">
                {!selectedProcessingAsset ? (
                  /* 자산 선택 카드 리스트 */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assetProcessingData.assets.filter(a => a.parts.length > 0).map(a => {
                      const routeCounts = { '재사용': 0, '부품회수': 0, '재활용': 0, '폐기': 0 };
                      a.parts.forEach(p => { if (p.route && routeCounts[p.route as keyof typeof routeCounts] !== undefined) routeCounts[p.route as keyof typeof routeCounts]++; });
                      return (
                        <div key={a.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedProcessingAsset(a.id)}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">
                                <Monitor className="w-5 h-5 text-orange-600" />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900">{a.model}</h4>
                                <p className="text-xs text-slate-400">{a.id} · {a.type} · {a.assetId}</p>
                              </div>
                            </div>
                            <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                              a.stage === '분류완료' ? "bg-blue-100 text-blue-700" :
                              a.stage === '처분완료' ? "bg-emerald-100 text-emerald-700" :
                              "bg-amber-100 text-amber-700"
                            )}>{a.stage}</span>
                          </div>
                          <div className="flex gap-2 text-[11px] font-bold">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded">재사용 {routeCounts['재사용']}</span>
                            <span className="px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded">부품회수 {routeCounts['부품회수']}</span>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">재활용 {routeCounts['재활용']}</span>
                            <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded">폐기 {routeCounts['폐기']}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-3">부품 {a.parts.length}개 · 담당: {a.operator}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* 선택된 자산의 부품 상세 */
                  (() => {
                    const asset = assetProcessingData.assets.find(a => a.id === selectedProcessingAsset);
                    if (!asset) return null;
                    return (
                      <div className="space-y-4">
                        <button onClick={() => setSelectedProcessingAsset(null)}
                          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700">
                          <ArrowLeft className="w-4 h-4" /> 목록으로
                        </button>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                                <Monitor className="w-6 h-6 text-orange-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-slate-900">{asset.model}</h3>
                                <p className="text-sm text-slate-400">{asset.id} · {asset.type} · 담당: {asset.operator}</p>
                              </div>
                            </div>
                          </div>

                          {/* 부품 테이블 */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                  <th className="text-left px-4 py-3 font-bold text-slate-600">부품</th>
                                  <th className="text-left px-4 py-3 font-bold text-slate-600">분류</th>
                                  <th className="text-left px-4 py-3 font-bold text-slate-600">상태</th>
                                  <th className="text-left px-4 py-3 font-bold text-slate-600">처분 경로</th>
                                  <th className="text-left px-4 py-3 font-bold text-slate-600">회수 소재</th>
                                  <th className="text-left px-4 py-3 font-bold text-slate-600">중량</th>
                                  <th className="text-left px-4 py-3 font-bold text-slate-600">잔존가치</th>
                                </tr>
                              </thead>
                              <tbody>
                                {asset.parts.map(p => (
                                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-4 py-3">
                                      <span className="font-bold text-slate-800">{p.name}</span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">{p.category}</td>
                                    <td className="px-4 py-3">
                                      <span className={cn("px-2 py-0.5 rounded text-[11px] font-bold",
                                        p.condition === '양호' ? "bg-emerald-50 text-emerald-700" :
                                        p.condition === '불량' ? "bg-rose-50 text-rose-700" :
                                        p.condition === '수명초과' ? "bg-amber-50 text-amber-700" :
                                        p.condition === '폐기완료' ? "bg-slate-100 text-slate-500" :
                                        "bg-blue-50 text-blue-700"
                                      )}>{p.condition}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                      {p.route ? (
                                        <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                          p.route === '재사용' ? "bg-blue-100 text-blue-700" :
                                          p.route === '부품회수' ? "bg-cyan-100 text-cyan-700" :
                                          p.route === '재활용' ? "bg-emerald-100 text-emerald-700" :
                                          "bg-rose-100 text-rose-700"
                                        )}>{p.route}</span>
                                      ) : <span className="text-xs text-slate-400">미배정</span>}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">{p.material || '—'}</td>
                                    <td className="px-4 py-3 text-xs font-bold text-slate-600">{p.weight}</td>
                                    <td className="px-4 py-3 text-xs font-bold text-slate-800">{p.value || '—'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* ===== 탭3: 처분 경로 관리 ===== */}
            {processingTab === 'disposition' && (
              <div className="space-y-6">
                {/* 4가지 처분 경로 카드 */}
                {[
                  { title: '부품 회수', desc: '검수 완료된 양품 부품을 재고로 등록하여 재판매 준비', icon: Box, color: 'cyan',
                    items: assetProcessingData.assets.flatMap(a => a.parts.filter(p => p.route === '부품회수')),
                  },
                  { title: '재사용 (Refurbish)', desc: '정비·초기화 후 재판매 또는 기부 대상으로 관리', icon: Gift, color: 'blue',
                    items: assetProcessingData.assets.flatMap(a => a.parts.filter(p => p.route === '재사용')),
                  },
                  { title: '재활용 (Material Recovery)', desc: '소재별 분리 후 재활용 업체에 인계, 원재료 회수', icon: Recycle, color: 'emerald',
                    items: assetProcessingData.assets.flatMap(a => a.parts.filter(p => p.route === '재활용')),
                  },
                  { title: '최종 폐기', desc: '재활용 불가 잔여물 소각/매립 처리 (올바로 연동)', icon: Trash2, color: 'rose',
                    items: assetProcessingData.assets.flatMap(a => a.parts.filter(p => p.route === '폐기')),
                  },
                ].map((route, ri) => (
                  <div key={ri} className={cn("bg-white rounded-2xl border shadow-sm overflow-hidden",
                    route.color === 'rose' ? "border-rose-200" : "border-slate-200"
                  )}>
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center",
                          route.color === 'cyan' ? "bg-cyan-50 text-cyan-600" :
                          route.color === 'blue' ? "bg-blue-50 text-blue-600" :
                          route.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                          "bg-rose-50 text-rose-600"
                        )}>
                          <route.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{route.title}</h3>
                          <p className="text-xs text-slate-400">{route.desc}</p>
                        </div>
                      </div>
                      <span className="text-2xl font-black text-slate-900">{route.items.length}<span className="text-sm font-bold text-slate-400 ml-1">건</span></span>
                    </div>
                    {route.items.length > 0 && (
                      <div className="p-4">
                        <div className="space-y-2">
                          {route.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold",
                                  item.condition === '양호' ? "bg-emerald-100 text-emerald-700" :
                                  item.condition === '수명초과' ? "bg-amber-100 text-amber-700" :
                                  item.condition === '폐기완료' ? "bg-slate-200 text-slate-600" :
                                  "bg-rose-100 text-rose-700"
                                )}>{item.condition}</span>
                                <span className="text-sm font-bold text-slate-800">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                {item.material && <span className="font-mono">{item.material}</span>}
                                <span className="font-bold">{item.weight}</span>
                                <span className="font-bold text-slate-800">{item.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ===== 탭4: 처분 통계 ===== */}
            {processingTab === 'stats' && (
              <div className="space-y-6">
                {/* 월별 처분 경로 차트 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-orange-600" /> 월별 처분 경로 (건)
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={assetProcessingData.dispositionStats.monthly} barGap={2}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                        <Bar dataKey="reuse" name="재사용" fill="#3b82f6" radius={[4,4,0,0]} />
                        <Bar dataKey="partsRecovery" name="부품회수" fill="#06b6d4" radius={[4,4,0,0]} />
                        <Bar dataKey="recycle" name="재활용" fill="#10b981" radius={[4,4,0,0]} />
                        <Bar dataKey="waste" name="폐기" fill="#f43f5e" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 처분 비율 파이차트 */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Recycle className="w-5 h-5 text-orange-600" /> 처분 경로 비율 (누적)
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: '재사용', value: 105, fill: '#3b82f6' },
                            { name: '부품회수', value: 57, fill: '#06b6d4' },
                            { name: '재활용', value: 235, fill: '#10b981' },
                            { name: '폐기', value: 19, fill: '#f43f5e' },
                          ]}
                          cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 원재료 회수 현황 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Gem className="w-5 h-5 text-orange-600" /> 원재료 회수 현황 (2026년 누적)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assetProcessingData.dispositionStats.materialRecovery.map((m, i) => (
                      <div key={i} className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                        <p className="text-sm font-bold text-slate-800">{m.material}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{m.recovered}</p>
                        <p className="text-xs font-bold text-emerald-600 mt-1">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 경제적 성과 */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <CircleDollarSign className="w-5 h-5" /> 경제적 성과 (2026년 누적)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: '재판매 수익', value: `₩${(assetProcessingData.dispositionStats.economics.resaleRevenue / 10000).toFixed(0)}만`, color: 'text-blue-700' },
                      { label: '부품 판매', value: `₩${(assetProcessingData.dispositionStats.economics.partsRevenue / 10000).toFixed(0)}만`, color: 'text-cyan-700' },
                      { label: '원재료 회수', value: `₩${(assetProcessingData.dispositionStats.economics.materialRevenue / 10000).toFixed(0)}만`, color: 'text-emerald-700' },
                      { label: '폐기 비용', value: `-₩${(assetProcessingData.dispositionStats.economics.disposalCost / 10000).toFixed(0)}만`, color: 'text-rose-600' },
                      { label: '순 회수가치', value: `₩${(assetProcessingData.dispositionStats.economics.netValue / 10000).toFixed(0)}만`, color: 'text-orange-800' },
                    ].map((stat, i) => (
                      <div key={i} className={cn("text-center p-3 rounded-xl", i === 4 ? "bg-white/80 border border-orange-300" : "bg-white/50")}>
                        <p className="text-xs font-bold text-orange-700">{stat.label}</p>
                        <p className={cn("text-xl font-black mt-1", stat.color)}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 'circulation':
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
                <Recycle className="w-8 h-8 text-emerald-600" />
                자원 순환 통계
              </h1>
              <p className="text-slate-500 mt-1">IT자산 처리 전 과정의 자원순환 성과와 ESG 지표를 통계 형태로 확인합니다.</p>
            </div>

            {/* 상단 요약 카드 4개 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '자원순환율', value: '90%', sub: '(재사용+재활용) ÷ 총 처리', icon: Recycle, color: 'emerald' },
                { label: '탄소 절감량', value: '9,800 kg', sub: 'CO₂e 누적 절감', icon: Leaf, color: 'emerald' },
                { label: '매립 회피량', value: '1,400 kg', sub: '금월 기준', icon: Globe, color: 'blue' },
                { label: '잔존가치 회수', value: '₩7,500만', sub: '재판매 + 부품 수익', icon: TrendingUp, color: 'indigo' },
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

            {/* 처리 현황 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 처리 방식 비율 (도넛) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">처리 방식 비율</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={processingMethodData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                        {processingMethodData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                      <Legend iconType="circle" formatter={(value: string) => <span className="text-xs font-bold text-slate-600">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 월별 처리량 추이 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-700 mb-4">월별 처리량 추이</h3>
                <div className="h-56">
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
                </div>
              </div>
            </div>

            {/* ESG 환경 성과 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 탄소 절감량 누적 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">탄소 절감량 추이 (kg CO₂e)</h3>
                <div className="h-56">
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
                      <Area type="monotone" dataKey="reduction" name="절감량" stroke="#10b981" strokeWidth={3} fill="url(#colorCarbonCirc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 매립 회피량 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">매립 회피량 (kg)</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={landfillAvoidanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                      <Bar dataKey="weight" name="회피량(kg)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 경제적 가치 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 잔존가치 회수액 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-700 mb-4">잔존가치 회수액 추이 (원)</h3>
                <div className="h-56">
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
                </div>
              </div>

              {/* 원자재 회수량 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">원자재 회수량 (g/kg)</h3>
                <div className="space-y-3 mt-2">
                  {[
                    { name: '금(Au)', value: 25, unit: 'g', max: 50, color: 'bg-amber-400' },
                    { name: '은(Ag)', value: 88, unit: 'g', max: 150, color: 'bg-slate-400' },
                    { name: '구리(Cu)', value: 240, unit: 'kg', max: 400, color: 'bg-orange-400' },
                    { name: '알루미늄(Al)', value: 580, unit: 'kg', max: 800, color: 'bg-blue-400' },
                    { name: '희토류', value: 15, unit: 'g', max: 30, color: 'bg-purple-400' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-bold text-slate-600">{item.name}</span>
                        <span className="font-bold text-slate-900">{item.value}{item.unit}</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", item.color)} style={{ width: `${(item.value / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 수명연장 + 비용절감 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 수명연장 효과 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">리퍼 장비 평균 수명연장 (년)</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lifeExtensionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 4]} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                      <Line type="monotone" dataKey="years" name="추가 사용 연수" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5, fill: '#8b5cf6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 처리 비용 절감 비교 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-4">처리 비용 절감 비교 (만원/건)</h3>
                <div className="h-56 flex items-end justify-center gap-16 pb-8">
                  {costSavingData.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span className="text-lg font-black text-slate-900">{item.cost}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.cost / 1500) * 160}px` }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        className={cn("w-20 rounded-t-xl", i === 0 ? "bg-slate-300" : "bg-emerald-500")}
                      />
                      <span className={cn("text-sm font-bold", i === 0 ? "text-slate-500" : "text-emerald-600")}>{item.name}</span>
                    </div>
                  ))}
                  <div className="absolute right-12 top-16 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                    <p className="text-xs font-bold text-emerald-700">29% 절감</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 월별 수거 추이 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 mb-4">월별 수거 추이</h3>
              <div className="h-56">
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
              </div>
            </div>
          </motion.div>
        );
      case 'reports':
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
                <FileText className="w-8 h-8 text-indigo-600" />
                리포트 센터
              </h1>
              <p className="text-slate-500 mt-1">자산 관리 및 ESG 성과 리포트를 확인하고 다운로드할 수 있습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'ESG 성과 리포트',
                  date: '2026년 3월',
                  desc: '탄소 저감 및 자원 순환 기여도 요약',
                  icon: Leaf,
                  color: 'emerald',
                  preview: [
                    { label: '탄소 절감량 (누적)', value: '9,800 kg CO₂e' },
                    { label: '매립 회피량 (금월)', value: '1,400 kg' },
                    { label: '자원순환율', value: '90%' },
                    { label: '재사용 장비 수', value: '2,016대' },
                    { label: '리퍼 평균 수명연장', value: '2.8년' },
                  ],
                },
                {
                  title: '자산 폐기 증명서',
                  date: '2026년 3월',
                  desc: '데이터 파기 및 물리적 폐기 공정 완료 증명',
                  icon: ShieldCheck,
                  color: 'rose',
                  preview: [
                    { label: '총 폐기 처리 건수', value: '156건' },
                    { label: '소프트웨어 삭제', value: '72건 (NIST 800-88)' },
                    { label: '디가우징', value: '24건' },
                    { label: '물리파괴', value: '48건 (DoD 5220.22-M)' },
                    { label: '인증서 발급 완료', value: '148건 (CoD)' },
                  ],
                },
                {
                  title: 'IT자산 인벤토리 현황',
                  date: '2026년 3월',
                  desc: '현재 보유 및 처리 중인 자산 상세 내역',
                  icon: Monitor,
                  color: 'blue',
                  preview: [
                    { label: '총 관리 자산', value: '4,460대' },
                    { label: 'PC / 노트북', value: '1,840대' },
                    { label: '서버', value: '920대' },
                    { label: '모바일', value: '1,200대' },
                    { label: '네트워크 장비', value: '500대' },
                  ],
                },
                {
                  title: '연간 자원 순환 통계',
                  date: '2025년 연간',
                  desc: '지난 1년간의 자원 순환 트렌드 분석',
                  icon: BarChart3,
                  color: 'indigo',
                  preview: [
                    { label: '연간 총 처리량', value: '3,180대' },
                    { label: '재사용 비율', value: '45%' },
                    { label: '부품회수 비율', value: '25%' },
                    { label: '잔존가치 총 회수', value: '₩3.6억' },
                    { label: '원자재 회수 (구리)', value: '1,085 kg' },
                  ],
                },
                {
                  title: '보안운송 이력 리포트',
                  date: '2026년 3월',
                  desc: '보안운송 수행 이력 및 Chain of Custody 기록',
                  icon: Truck,
                  color: 'slate',
                  preview: [
                    { label: '총 운송 건수', value: '89건' },
                    { label: '평균 운송시간', value: '2시간 35분' },
                    { label: '경로이탈 발생', value: '0건' },
                    { label: '봉인 이상', value: '0건' },
                    { label: '정합성 일치율', value: '99.2%' },
                  ],
                },
                {
                  title: '비용 절감 분석 리포트',
                  date: '2026년 Q1',
                  desc: '기존 방식 대비 플랫폼 이용 시 비용 절감 분석',
                  icon: TrendingDown,
                  color: 'amber',
                  preview: [
                    { label: '기존 처리 비용', value: '₩1,200만/건' },
                    { label: 'K-ITAD 비용', value: '₩850만/건' },
                    { label: '절감률', value: '29.2%' },
                    { label: '분기 총 절감액', value: '₩3,150만' },
                    { label: '재판매 수익', value: '₩7,500만' },
                  ],
                },
              ].map((report, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        report.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                        report.color === 'rose' ? "bg-rose-50 text-rose-600" :
                        report.color === 'blue' ? "bg-blue-50 text-blue-600" :
                        report.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                        report.color === 'amber' ? "bg-amber-50 text-amber-600" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        <report.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{report.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{report.date}</p>
                        <p className="text-sm text-slate-500 mt-2">{report.desc}</p>
                      </div>
                    </div>

                    {/* 미리보기 콘텐츠 */}
                    <div className="mt-4 bg-slate-50 rounded-xl p-4 space-y-2.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">미리보기</p>
                      {report.preview.map((item, j) => (
                        <div key={j} className="flex justify-between text-sm">
                          <span className="text-slate-500">{item.label}</span>
                          <span className="font-bold text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> 상세 보기
                      </button>
                      <button className="flex-1 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                        <Download className="w-4 h-4" /> 다운로드
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'allbaro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 pb-20"
          >
            {/* 헤더 */}
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <Link2 className="w-8 h-8 text-teal-600" />
                  올바로 시스템 연동
                </h1>
                <p className="text-slate-500 mt-1">환경부 올바로시스템과의 폐기물 인계·처리 데이터를 관리합니다.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-700">API 연결됨</span>
                </div>
                <div className="text-xs text-slate-400 font-bold">마지막 동기화: {allbaroData.summary.lastSync}</div>
              </div>
            </div>

            {/* 상단 요약 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: '총 인계서', value: allbaroData.summary.totalManifests, sub: '건', icon: FileText, color: 'slate' },
                { label: '제출 대기', value: allbaroData.summary.pendingSubmit, sub: '건', icon: Send, color: 'amber' },
                { label: '제출 완료', value: allbaroData.summary.submitted, sub: '건', icon: CheckCircle2, color: 'emerald' },
                { label: '반려/기한초과', value: allbaroData.summary.rejected + allbaroData.summary.overdue, sub: '건', icon: CircleAlert, color: 'rose' },
                { label: '연동율', value: allbaroData.summary.syncRate, sub: '%', icon: Link2, color: 'teal' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center",
                      card.color === 'amber' ? "bg-amber-50 text-amber-600" :
                      card.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                      card.color === 'rose' ? "bg-rose-50 text-rose-600" :
                      card.color === 'teal' ? "bg-teal-50 text-teal-600" :
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

            {/* 탭 메뉴 */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
              {([
                { key: 'manifest' as const, label: '전자인계서', icon: FileText },
                { key: 'history' as const, label: '제출 이력', icon: History },
                { key: 'verify' as const, label: '허가업체 검증', icon: BadgeCheck },
                { key: 'result' as const, label: '처리실적 보고', icon: BarChart3 },
                { key: 'alerts' as const, label: '알림', icon: Bell },
              ]).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setAllbaroTab(tab.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                    allbaroTab === tab.key ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.key === 'alerts' && allbaroData.alerts.filter(a => !a.read).length > 0 && (
                    <span className="w-5 h-5 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full">
                      {allbaroData.alerts.filter(a => !a.read).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ===== 탭 1: 전자인계서 관리 ===== */}
            {allbaroTab === 'manifest' && (
              <div className="space-y-4">
                {/* 필터/검색 바 */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl">
                    {['전체', '제출대기', '제출완료', '반려'].map(f => (
                      <button key={f} onClick={() => setAllbaroManifestFilter(f)}
                        className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          allbaroManifestFilter === f ? "bg-teal-600 text-white" : "text-slate-500 hover:bg-slate-50"
                        )}>{f}</button>
                    ))}
                  </div>
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={allbaroSearch} onChange={e => setAllbaroSearch(e.target.value)}
                      placeholder="인계서번호, 배출신청번호, 배출자 검색..."
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                  </div>
                  <button className="ml-auto px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> 올바로 동기화
                  </button>
                </div>

                {/* 인계서 테이블 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left px-4 py-3 font-bold text-slate-600">인계서번호</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">유형</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">폐기물 분류</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">수량</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">배출자</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">처리방법</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">상태</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">올바로 접수번호</th>
                          <th className="text-left px-4 py-3 font-bold text-slate-600">액션</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredManifests.map(m => (
                          <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3">
                              <span className="font-bold text-teal-700">{m.id}</span>
                              <p className="text-[11px] text-slate-400">{m.emissionId}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold",
                                m.type === '전자인계서' ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                              )}>{m.type}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-bold text-slate-700">{m.wasteCode}</span>
                              <p className="text-[11px] text-slate-400">{m.wasteName}</p>
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-700">{m.quantity}</td>
                            <td className="px-4 py-3">
                              <span className="font-bold text-slate-700">{m.emitter}</span>
                              <p className="text-[11px] text-slate-400">{m.emitterBizNo}</p>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{m.method}</td>
                            <td className="px-4 py-3">
                              <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                m.status === '제출대기' ? "bg-amber-100 text-amber-700" :
                                m.status === '제출완료' ? "bg-emerald-100 text-emerald-700" :
                                "bg-rose-100 text-rose-700"
                              )}>{m.status}</span>
                            </td>
                            <td className="px-4 py-3 text-xs font-mono text-slate-500">{m.allbaroNo || '—'}</td>
                            <td className="px-4 py-3">
                              {m.status === '제출대기' && (
                                <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-[11px] font-bold hover:bg-teal-700 transition-all flex items-center gap-1">
                                  <Send className="w-3 h-3" /> 제출
                                </button>
                              )}
                              {m.status === '반려' && (
                                <button className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-[11px] font-bold hover:bg-rose-200 transition-all flex items-center gap-1">
                                  <Edit3 className="w-3 h-3" /> 수정/재제출
                                </button>
                              )}
                              {m.status === '제출완료' && (
                                <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold hover:bg-slate-200 transition-all flex items-center gap-1">
                                  <Eye className="w-3 h-3" /> 조회
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 하단 안내 */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-bold">올바로 전자인계서 안내</p>
                    <p className="mt-1 text-blue-600">배출 → 수집운반 → 처리 단계별로 전자인계서가 자동 생성됩니다. K-ITAD 배출신청 완료 시 폐기물관리법 시행규칙에 따른 양식으로 변환되며, 담당자 검토 후 올바로 API를 통해 제출합니다.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ===== 탭 2: 제출 이력 ===== */}
            {allbaroTab === 'history' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <History className="w-5 h-5 text-teal-600" /> 올바로 제출 타임라인
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-0">
                      {allbaroData.manifests.filter(m => m.submittedAt).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).map((m, i) => (
                        <div key={m.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2",
                              m.status === '제출완료' ? "bg-emerald-500 border-emerald-500" :
                              m.status === '반려' ? "bg-rose-500 border-rose-500" :
                              "bg-amber-500 border-amber-500"
                            )}>
                              {m.status === '제출완료' ? <Check className="w-4 h-4 text-white" /> :
                               m.status === '반려' ? <X className="w-4 h-4 text-white" /> :
                               <Clock className="w-4 h-4 text-white" />}
                            </div>
                            {i < allbaroData.manifests.filter(m2 => m2.submittedAt).length - 1 && (
                              <div className="w-0.5 h-16 bg-slate-200" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">{m.id}</span>
                                  <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold",
                                    m.status === '제출완료' ? "bg-emerald-100 text-emerald-700" :
                                    m.status === '반려' ? "bg-rose-100 text-rose-700" :
                                    "bg-amber-100 text-amber-700"
                                  )}>{m.status}</span>
                                </div>
                                <span className="text-xs text-slate-400 font-bold">{m.submittedAt}</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                <div><span className="text-slate-400">배출자</span><p className="font-bold text-slate-700">{m.emitter}</p></div>
                                <div><span className="text-slate-400">폐기물</span><p className="font-bold text-slate-700">{m.wasteName}</p></div>
                                <div><span className="text-slate-400">수량</span><p className="font-bold text-slate-700">{m.quantity}</p></div>
                                <div><span className="text-slate-400">올바로 접수번호</span><p className="font-bold text-teal-700 font-mono">{m.allbaroNo || '—'}</p></div>
                              </div>
                              {m.status === '반려' && (m as typeof m & { rejectReason?: string }).rejectReason && (
                                <div className="mt-3 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-bold flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  반려 사유: {(m as typeof m & { rejectReason?: string }).rejectReason}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== 탭 3: 허가업체 검증 ===== */}
            {allbaroTab === 'verify' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">올바로 API를 통해 수집운반·처리업체의 허가 유효성을 실시간 검증합니다.</p>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> 전체 재검증
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allbaroData.verifiedCompanies.map((company, i) => (
                    <div key={i} className={cn("bg-white rounded-2xl border shadow-sm overflow-hidden",
                      company.status === '만료임박' ? "border-amber-300" : "border-slate-200"
                    )}>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center",
                              company.role.includes('수집운반') ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                            )}>
                              {company.role.includes('수집운반') ? <Truck className="w-6 h-6" /> : <Building className="w-6 h-6" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{company.name}</h4>
                              <p className="text-xs text-slate-400">{company.bizNo} · {company.role}</p>
                            </div>
                          </div>
                          <span className={cn("px-3 py-1 rounded-lg text-xs font-bold",
                            company.status === '유효' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          )}>
                            {company.status === '유효' ? '✅' : '⚠️'} {company.status}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">허가번호</span>
                            <span className="font-bold text-slate-700 font-mono text-xs">{company.permitNo}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">허가 만료일</span>
                            <span className={cn("font-bold", company.status === '만료임박' ? "text-amber-600" : "text-slate-700")}>{company.permitExpiry}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">최종 검증</span>
                            <span className="font-bold text-slate-500 text-xs">{company.lastVerified}</span>
                          </div>
                          <div className="flex justify-between text-sm items-start">
                            <span className="text-slate-500">취급 폐기물</span>
                            <div className="flex flex-wrap gap-1 justify-end">
                              {company.wasteTypes.map(wt => (
                                <span key={wt} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{wt}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {company.status === '만료임박' && (
                          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-bold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            허가 만료가 임박합니다. 갱신 여부를 확인하세요.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 폐기물 코드 매핑표 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Hash className="w-5 h-5 text-teal-600" />
                      폐기물 분류코드 매핑
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">K-ITAD 자산 카테고리와 올바로 폐기물 분류코드 간 매핑 현황</p>
                  </div>
                  <div className="p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left px-4 py-2 font-bold text-slate-600 rounded-l-lg">K-ITAD 자산 분류</th>
                          <th className="text-left px-4 py-2 font-bold text-slate-600">올바로 분류코드</th>
                          <th className="text-left px-4 py-2 font-bold text-slate-600">폐기물 명칭</th>
                          <th className="text-left px-4 py-2 font-bold text-slate-600 rounded-r-lg">성상</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { itad: '서버 (Server)', code: '73-01-01', name: '폐전자제품(대형)', type: '고형' },
                          { itad: 'PC / 노트북', code: '73-01-02', name: '폐전자제품(소형)', type: '고형' },
                          { itad: 'HDD / SSD / NVMe', code: '73-01-03', name: '폐저장매체', type: '고형' },
                          { itad: '네트워크 장비', code: '73-02-01', name: '폐통신기기', type: '고형' },
                          { itad: '모니터 / 디스플레이', code: '73-01-04', name: '폐영상표시장치', type: '고형' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-slate-100">
                            <td className="px-4 py-2.5 font-bold text-slate-700">{row.itad}</td>
                            <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded font-mono text-xs font-bold">{row.code}</span></td>
                            <td className="px-4 py-2.5 text-slate-600">{row.name}</td>
                            <td className="px-4 py-2.5 text-slate-500">{row.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== 탭 4: 처리실적 보고 ===== */}
            {allbaroTab === 'result' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 월별 처리실적 차트 */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-teal-600" /> 월별 처리실적 (kg)
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={allbaroData.processingResults} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                        <Bar dataKey="recycled" name="재활용" fill="#10b981" radius={[4,4,0,0]} />
                        <Bar dataKey="incinerated" name="소각" fill="#f59e0b" radius={[4,4,0,0]} />
                        <Bar dataKey="landfill" name="매립" fill="#ef4444" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 처리방법 비율 */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Recycle className="w-5 h-5 text-teal-600" /> 처리방법 비율 (2026년 누적)
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: '재활용', value: 8400, fill: '#10b981' },
                            { name: '소각', value: 295, fill: '#f59e0b' },
                            { name: '매립', value: 28, fill: '#ef4444' },
                          ]}
                          cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 월별 보고 현황 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Clipboard className="w-5 h-5 text-teal-600" /> 월별 처리실적 보고 현황
                    </h3>
                  </div>
                  <div className="p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left px-4 py-2 font-bold text-slate-600 rounded-l-lg">기간</th>
                          <th className="text-right px-4 py-2 font-bold text-slate-600">재활용 (kg)</th>
                          <th className="text-right px-4 py-2 font-bold text-slate-600">소각 (kg)</th>
                          <th className="text-right px-4 py-2 font-bold text-slate-600">매립 (kg)</th>
                          <th className="text-right px-4 py-2 font-bold text-slate-600">합계 (kg)</th>
                          <th className="text-right px-4 py-2 font-bold text-slate-600">제출 건수</th>
                          <th className="text-left px-4 py-2 font-bold text-slate-600 rounded-r-lg">보고 상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allbaroData.processingResults.map((r, i) => (
                          <tr key={i} className="border-b border-slate-100">
                            <td className="px-4 py-3 font-bold text-slate-700">{r.month}</td>
                            <td className="px-4 py-3 text-right font-bold text-emerald-600">{r.recycled.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right font-bold text-amber-600">{r.incinerated.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right font-bold text-rose-600">{r.landfill.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-900">{r.total.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-600">{r.submittedCount}건</td>
                            <td className="px-4 py-3">
                              <span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold",
                                i < 2 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                              )}>{i < 2 ? '보고완료' : '진행중'}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 재활용률 요약 */}
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-teal-900">2026년 누적 재활용률</h4>
                      <p className="text-sm text-teal-600 mt-1">올바로 보고 기준 — 폐기물관리법 시행규칙 제18조</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-teal-700">96.3<span className="text-lg">%</span></p>
                      <p className="text-xs font-bold text-teal-500">재활용 8,400kg / 전체 8,723kg</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== 탭 5: 알림 ===== */}
            {allbaroTab === 'alerts' && (
              <div className="space-y-3">
                {allbaroData.alerts.map(alert => (
                  <div key={alert.id} className={cn(
                    "bg-white rounded-xl border p-4 flex items-start gap-4 transition-all",
                    !alert.read ? "border-teal-200 shadow-sm" : "border-slate-200 opacity-80",
                    alert.severity === 'error' ? "border-l-4 border-l-rose-500" :
                    alert.severity === 'warning' ? "border-l-4 border-l-amber-500" :
                    "border-l-4 border-l-blue-400"
                  )}>
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      alert.severity === 'error' ? "bg-rose-50 text-rose-600" :
                      alert.severity === 'warning' ? "bg-amber-50 text-amber-600" :
                      "bg-blue-50 text-blue-600"
                    )}>
                      {alert.severity === 'error' ? <CircleAlert className="w-5 h-5" /> :
                       alert.severity === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                       <CheckCircle2 className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold",
                          alert.severity === 'error' ? "bg-rose-100 text-rose-700" :
                          alert.severity === 'warning' ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        )}>{alert.type}</span>
                        {!alert.read && <span className="w-2 h-2 rounded-full bg-teal-500" />}
                      </div>
                      <p className="text-sm font-bold text-slate-800">{alert.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                    </div>
                    {!alert.read && (
                      <button className="text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1">읽음</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );

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

            <button 
              onClick={() => setIsLoggedIn(true)}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
            >
              플랫폼 로그인
            </button>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold mb-6">
                <Zap className="w-3 h-3" />
                <span>국내 최초 지능형 ITAD 통합 플랫폼</span>
              </div>
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
                  onClick={() => setIsLoggedIn(true)}
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
              <div className="mt-8 inline-block px-4 py-1 bg-slate-200 rounded-full text-sm font-bold text-slate-600">
                핵심은 세 가지입니다
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
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-xl tracking-tight">K-ITAD</span>
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
