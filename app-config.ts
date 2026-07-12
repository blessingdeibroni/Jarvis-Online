import type { AppConfig } from './lib/types';

export type { AppConfig };

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Jarvis',
  pageTitle: 'Jarvis Voice Agent',
  pageDescription: 'Your advanced AI assistant',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/jarvis logo.jpg',
  accent: '#002cf2',
  logoDark: '/jarvis logo.jpg',
  accentDark: '#1fd5f9',
  startButtonText: 'Talk to Jarvis',

  // optional: audio visualization configuration
  // audioVisualizerType: 'bar',
  // audioVisualizerColor: '#002cf2',
  // audioVisualizerColorDark: '#1fd5f9',
  // audioVisualizerColorShift: 0.3,
  // audioVisualizerBarCount: 5,
  // audioVisualizerType: 'radial',
  // audioVisualizerRadialBarCount: 24,
  // audioVisualizerRadialRadius: 100,
  // audioVisualizerType: 'grid',
  // audioVisualizerGridRowCount: 25,
  // audioVisualizerGridColumnCount: 25,
  // audioVisualizerType: 'wave',
  // audioVisualizerWaveLineWidth: 3,
  // audioVisualizerType: 'aura',

  // agent dispatch configuration
  agentName: undefined,

  // LiveKit Cloud Sandbox configuration
  sandboxId: undefined,
};
