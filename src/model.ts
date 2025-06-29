import { BgsBoard, BgsHeroQuest, BgsHeroTrinket, BgsPostMatchStats } from '@firestone-hs/hs-replay-xml-parser';
import { BnetRegion, Race } from '@firestone-hs/reference-data';

export interface ReplayUploadMetadata {
	readonly user: {
		readonly userId: string;
		readonly userName: string;
		readonly isPremium: boolean;
	};
	readonly game: {
		readonly uniqueId: string;
		readonly reviewId: string;
		readonly replayKey: string;
		readonly deckstring: string;
		readonly normalizedDeckstring: string | null;
		readonly deckName: string;
		readonly scenarioId: number;
		readonly buildNumber: number;
		readonly playerRank: string;
		readonly newPlayerRank: string;
		readonly seasonId: number;
		readonly opponentRank: string;
		readonly gameMode: StatGameModeType;
		readonly gameFormat: StatGameFormatType;
		readonly additionalResult: string;
		readonly runId: string;

		// Coming from the replay
		readonly mainPlayerName: string;
		readonly mainPlayerCardId: string;
		readonly mainPlayerId: number;
		readonly opponentPlayerName: string;
		readonly forceOpponentName: string;
		readonly opponentPlayerCardId: string;
		readonly opponentPlayerId: number;
		readonly result: 'won' | 'lost' | 'tied';
		readonly playCoin: 'play' | 'coin';
		readonly totalDurationSeconds: number;
		readonly totalDurationTurns: number;
		// readonly additionalResult: string;
	};
	readonly bgs: {
		readonly hasPrizes: boolean;
		readonly hasSpells: boolean;
		readonly hasQuests: boolean;
		readonly hasTrinkets: boolean;
		readonly hasAnomalies: boolean;
		readonly bannedTribes: readonly Race[];
		readonly availableTribes: readonly Race[];
		readonly heroesOffered: readonly string[];
		readonly anomalies: readonly string[];
		readonly trinkets: readonly BgsHeroTrinket[];
		readonly trinketsOffered: readonly string[];
		readonly mainPlayerId: number;
		readonly heroQuests: readonly BgsHeroQuest[];
		readonly boardHistory: readonly BgsBoardLight[];
		readonly finalComp: BgsBoard | null;
		readonly isPerfectGame: boolean;
		readonly battleOdds: readonly { turn: number; wonPercent: number }[] | null;
		readonly warbandStats: readonly { turn: number; totalStats: number }[] | null;
		// readonly heroOptions: readonly string[]
		readonly postMatchStats: BgsPostMatchStats;
	};
	// I'm not building stats for mercs anymore, so I can probably scrap that
	readonly mercs?: {
		readonly bountyId: number;
		readonly heroTimings: {
			[heroCardId: string]: number;
		};
		readonly opponentMercsHeroTimings: {
			[heroCardId: string]: number;
		};
		readonly heroEquipments: {
			[heroCardId: string]: string | number;
		};
		readonly heroLevels: {
			[heroCardId: string]: number;
		};
		readonly heroSkillsUsed: {
			[abilityCardId: string]: number;
		};
	};
	readonly stats: {
		readonly matchAnalysis: MatchAnalysis | null;
		readonly playerPlayedCards: readonly string[];
		readonly playerPlayedCardsByTurn: readonly CardPlayedByTurn[];
		readonly playerCastCardsByTurn: readonly CardPlayedByTurn[];
		readonly opponentPlayedCards: readonly string[];
		readonly opponentPlayedCardsByTurn: readonly CardPlayedByTurn[];
		readonly opponentCastCardsByTurn: readonly CardPlayedByTurn[];
	};
	readonly meta: {
		readonly application: string;
		readonly appVersion: string;
		readonly appChannel: string;
		readonly region: BnetRegion;
		readonly allowGameShare: boolean;
		readonly realXpGained: number | undefined;
		readonly normalizedXpGained: number | undefined;
		readonly levelAfterMatch: string;
	};
}

export interface BgsBoardLight {
	readonly turn: number;
	readonly board: readonly EntityLight[];
}
export interface EntityLight {
	readonly id: number;
	readonly cardID: string;
	readonly tags: { [tag: string]: number };
}

export interface MatchAnalysis {
	readonly cardsAnalysis: readonly CardAnalysis[];
	readonly cardsBeforeMulligan: readonly string[];
	readonly cardsAfterMulligan: { cardId: string; kept: boolean }[];
	readonly cardsDrawn: { cardId: string; cardDbfId: number; turn: number }[];
	readonly cardsDiscovered: {
		cardId: string;
		cardDbfId: number;
		turn: number;
		sourceCardId: string;
	}[];
}

export interface CardAnalysis {
	cardId: string;
	drawnBeforeMulligan: boolean;
	mulligan: boolean;
	kept: boolean;
	drawnTurn: number | undefined;
	playedTurn: number | undefined | null;
	playedOnCurve: boolean;
}

export interface CardPlayedByTurn {
	readonly turn: number;
	readonly cardId: string;
	readonly createdBy: string | null;
}

export type StatGameFormatType = 'unknown' | 'all' | 'standard' | 'wild' | 'classic' | 'twist';
export type StatGameModeType =
	| 'unknown'
	| 'arena'
	| 'arena-draft'
	// Distinguish between the old and new arena modes
	| 'arena-underground'
	| 'arena-underground-draft'
	| 'casual'
	| 'friendly'
	| 'practice'
	| 'ranked'
	| 'tutorial'
	| 'tavern-brawl'
	| 'battlegrounds'
	| 'battlegrounds-friendly'
	| 'battlegrounds-duo'
	| 'duels'
	| 'mercenaries-ai-vs-ai'
	| 'mercenaries-pve'
	| 'mercenaries-pve-coop'
	| 'mercenaries-pvp'
	| 'mercenaries-friendly'
	| 'paid-duels';
