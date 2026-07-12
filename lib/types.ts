export interface AppConfig {
    companyName: string;
    pageTitle: string;
    pageDescription: string;
  
    supportsChatInput: boolean;
    supportsVideoInput: boolean;
    supportsScreenShare: boolean;
    isPreConnectBufferEnabled: boolean;
  
    logo: '/jarvis logo.jpg';
    accent: '#002cf2';
    logoDark: '/jarvis logo.jpg';
    accentDark: '#1fd5f9';
    startButtonText: 'Talk to Jarvis';
  
    audioVisualizerType?: 'bar' | 'radial' | 'grid' | 'wave' | 'aura';
    audioVisualizerColor?: '#002cf2';
    audioVisualizerColorDark?: '#1fd5f9';
    audioVisualizerColorShift?: 0.3;
    audioVisualizerBarCount?: 5;
    audioVisualizerRadialBarCount?: 24;
    audioVisualizerRadialRadius?: 100;
    audioVisualizerGridRowCount?: 25;
    audioVisualizerGridColumnCount?: 25;
    audioVisualizerWaveLineWidth?: 3;
  
    agentName?: 'Jarvis';
    sandboxId?: string;
  }