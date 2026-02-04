export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    fullContent: string;
    sourceUrl: string;
    sourceName: string;
    publishedAt: string;
    taxTypes: string[];
    affectedIndustries: string[];
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    posted: boolean;
    userViewed: boolean;
    crawledAt: string;
    postedAt?: string;
    detailedAnalysis?: DetailedAnalysis;
}

export interface DetailedAnalysis {
    signals: {
        legalHotspots: string;
        hiddenImpacts: string;
    };
    businessImpact: {
        affectedBusinessTypes: string[];
        riskAreas: string[];
    };
    concepts: Array<{
        name: string;
        objective: string;
        steps: string[];
        value: string;
    }>;
    actionChecklist: string[];
}
