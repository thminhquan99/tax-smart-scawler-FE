import axios from 'axios';
import type { NewsArticle } from '../types/news';

// Default to localhost:3001 if env var is missing
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface WeeklyStats {
    weekNumber: number;
    weekStartDate: string;
    totalDocuments: number;
    newDocuments: number;
    revisedDocuments: number;
    highPriorityChanges: number;
    totalChanges: number;
    affectedIndustries: string[];
    taxTypeBreakdown: Record<string, number>;
}

export interface AnalysisSummary {
    id: string;
    weekNumber: number;
    newDocument: {
        id: string;
        title: string;
        documentNumber: string;
        taxTypes: string[];
    };
    oldDocument?: {
        id: string;
        title: string;
        documentNumber: string;
    };
    summary: string;
    totalChanges: number;
    highPriorityCount: number;
    affectedIndustries: string[];
    userViewed: boolean;
    analyzedAt: string;
}

export interface AnalysisDetail extends AnalysisSummary {
    newDocument: {
        id: string;
        title: string;
        documentNumber: string;
        docType: string;
        taxTypes: string[];
        issueDate: string;
        effectiveDate: string;
        sourceUrl: string;
        fullContent: string;
    };
    oldDocument?: {
        id: string;
        title: string;
        documentNumber: string;
        fullContent: string;
    };
    analysis: {
        summary: string;
        totalChanges: number;
        changes: Array<{
            priority: 'HIGH' | 'MEDIUM' | 'LOW';
            category: string;
            title: string;
            oldProvision?: {
                article: string;
                text: string;
            };
            newProvision: {
                article: string;
                text: string;
            };
            impact: {
                type: 'INCREASE' | 'DECREASE' | 'NEUTRAL';
                description: string;
                example?: string;
            };
        }>;
        affectedIndustries: string[];
    };
}

export interface CrawlLog {
    id: string;
    startedAt: string;
    completedAt?: string;
    status: 'RUNNING' | 'SUCCESS' | 'FAILED';
    documentsFound: number;
    documentsSaved: number;
    error?: string;
}

export const apiService = {
    getWeeklyStats: (week?: string) =>
        api.get<WeeklyStats>('/weekly/stats', { params: { week } }),

    getWeeklyAnalyses: (week?: string) =>
        api.get<AnalysisSummary[]>('/weekly/analyses', { params: { week } }),

    getAnalysisDetail: (id: string) =>
        api.get<AnalysisDetail>(`/weekly/analyses/${id}`),

    getCrawlHistory: () =>
        api.get<CrawlLog[]>('/history').then(res => res.data),

    triggerCrawl: () =>
        api.post<{ success: boolean; saved: number }>('/crawler/trigger').then(res => res.data),

    // News endpoints
    getNews: (params?: { limit?: number; offset?: number; priority?: string }) =>
        api.get<{ items: NewsArticle[]; total: number; limit: number; offset: number; hasMore: boolean }>('/news', { params }),

    getNewsDetail: (id: string) =>
        api.get<NewsArticle>(`/news/${id}`).then(res => res.data),

    getNewsStats: () =>
        api.get<{ postedToday: number; remainingSlots: number; totalArticles: number }>('/news/stats').then(res => res.data),

    triggerNewsCrawl: () =>
        api.post<{ success: boolean; saved: number; total: number }>('/news/trigger-crawl').then(res => res.data),

    triggerNewsPost: () =>
        api.post<{ success: boolean; posted: number }>('/news/trigger-post').then(res => res.data),
};
