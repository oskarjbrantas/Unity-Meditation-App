/**
 * app/home.tsx
 * -------------
 * Home Screen — route: "/home"
 *
 * Chat overlay slides down from the top bar when opened,
 * floating OVER the honeycomb without pushing it.
 * Tapping anywhere outside the chat closes it.
 *
 * States:
 *   isConnected  — toggles Connect Live ↔ Disconnect
 *   chatOpen     — animates chat overlay down/up
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';

import HoneycombLogo from '../src/components/HoneycombLogo';
import { colors, spacing, radius, fonts } from '../src/theme';
import { home } from '../src/data/content';

import { router } from 'expo-router';

// ── Types ─────────────────────────────────────────────────────────

type PrayerMessage = {
  id:   string;
  text: string;
  time: string;
};

type NavItem = {
  key:   string;
  label: string;
};

// ── Nav items ─────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { key: 'home',      label: home.nav.home      },
  { key: 'toolbox',   label: home.nav.toolbox   },
  { key: 'community', label: home.nav.community },
  { key: 'account',   label: home.nav.account   },
];

// ── Chat overlay height ───────────────────────────────────────────
// How far the chat slides down from the top bar.
// Increase to cover more of the screen, decrease for less.
const CHAT_HEIGHT = 320;

// ── Component ─────────────────────────────────────────────────────

export default function HomeScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [chatOpen,    setChatOpen]    = useState(false);
  const [activeNav,   setActiveNav]   = useState('home');
  const [inputText,   setInputText]   = useState('');
  const [messages,    setMessages]    = useState<PrayerMessage[]>([]);

  // Tracks the bottom edge of the top bar so overlay starts there
  const [topBarBottom, setTopBarBottom] = useState(0);

  // Animated value: 0 = closed, 1 = fully open
  const slideAnim = useRef(new Animated.Value(0)).current;

  // ── Animate chat open/close ────────────────────────────────────
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue:         chatOpen ? 1 : 0,
      useNativeDriver: false,
      bounciness:      2,
      speed:           14,
    }).start();
  }, [chatOpen]);

  // ── Handlers ──────────────────────────────────────────────────

  const handleConnectToggle = () => setIsConnected(prev => !prev);
  const handleChatToggle    = () => setChatOpen(prev => !prev);
  const handleCloseChat     = () => setChatOpen(false);

  const handleSendPrayer = () => {
    if (!inputText.trim()) return;
    const now  = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: inputText.trim(), time },
    ]);
    setInputText('');
  };

  const handleNavPress = (key: string) => {
    setActiveNav(key);
    if (key === 'toolbox') router.replace('/toolbox');
    // if (key === 'community') router.replace('/community');
    // if (key === 'account')   router.replace('/account');
  };

  // ── Interpolate animated values ───────────────────────────────
  const chatSlideHeight = slideAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, CHAT_HEIGHT],
  });

  const chatOpacity = slideAnim.interpolate({
    inputRange:  [0, 0.4, 1],
    outputRange: [0, 0.7, 1],
  });

  // ── Render ────────────────────────────────────────────────────

  return (
    // Root view — overlay and backdrop live here so they truly float
    <View style={styles.root}>

      {/* ── MAIN LAYOUT ─────────────────────────────────────────*/}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* ── TOP BAR ─────────────────────────────────────────
            onLayout measures where the bar ends so the overlay
            starts exactly at the right position.              */}
        <View
          style={styles.topBar}
          onLayout={e => setTopBarBottom(e.nativeEvent.layout.y + e.nativeEvent.layout.height)}
        >
          <TouchableOpacity
            onPress={handleChatToggle}
            accessibilityLabel={home.topBarAccessibility}
            style={styles.crossButton}
          >
            <CrossIcon size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── BODY ────────────────────────────────────────────
            Always fully visible — overlay floats on top.     */}
        <View style={styles.body}>
          <View style={styles.centerSection}>
            <HoneycombLogo size={42} animated={false} />
          </View>

          <Text style={styles.title}>{home.title}</Text>

          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnectToggle}
            activeOpacity={0.75}
          >
            <Text style={styles.connectButtonText}>
              {isConnected ? home.disconnectButton : home.connectButton}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleChatToggle}
            style={styles.prayerButton}
          >
            <Text style={styles.prayerButtonText}>{home.prayerButton}</Text>
          </TouchableOpacity>
        </View>

        {/* ── BOTTOM NAV ──────────────────────────────────────*/}
        <View style={styles.bottomBar}>
          {NAV_ITEMS.map(item => {
            const isActive = activeNav === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.navItem,
                  isActive && {
                    backgroundColor: `rgba(26,26,26,${colors.navHighlightOpacity})`,
                  },
                ]}
                onPress={() => handleNavPress(item.key)}
                activeOpacity={0.7}
              >
                <NavIcon navKey={item.key} isActive={isActive} />
                <Text style={[
                  styles.navLabel,
                  { color: isActive ? colors.navActive : colors.navInactive },
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </KeyboardAvoidingView>

      {/* ── BACKDROP ────────────────────────────────────────────
          Rendered at root level — covers entire screen behind
          the chat. Tapping anywhere outside closes the chat.  */}
      {chatOpen && (
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={handleCloseChat}
          activeOpacity={1}
        />
      )}

      {/* ── CHAT OVERLAY ────────────────────────────────────────
          Rendered at root level so it truly floats over body.
          Positioned to start exactly where the top bar ends.  */}
      <Animated.View
        pointerEvents={chatOpen ? 'auto' : 'none'}
        style={[
          styles.chatOverlay,
          {
            top:     topBarBottom,
            height:  chatSlideHeight,
            opacity: chatOpacity,
          },
        ]}
      >
        <ChatBox
          messages={messages}
          inputText={inputText}
          onChangeText={setInputText}
          onSend={handleSendPrayer}
        />
      </Animated.View>

    </View>
  );
}

// ── Sub-components ────────────────────────────────────────────────

function CrossIcon({ size, color }: { size: number; color: string }) {
  const thickness = size * 0.15;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', width: size, height: thickness, backgroundColor: color, borderRadius: thickness / 2 }} />
      <View style={{ position: 'absolute', width: thickness, height: size, backgroundColor: color, borderRadius: thickness / 2 }} />
    </View>
  );
}

function ChatBox({
  messages, inputText, onChangeText, onSend,
}: {
  messages: PrayerMessage[]; inputText: string;
  onChangeText: (t: string) => void; onSend: () => void;
}) {
  return (
    <View style={chatStyles.container}>
      <Text style={chatStyles.title}>{home.chatTitle}</Text>
      <ScrollView style={chatStyles.messageList} contentContainerStyle={chatStyles.messageContent}>
        {messages.length === 0 ? (
          <Text style={chatStyles.empty}>{home.chatEmpty}</Text>
        ) : (
          messages.map(msg => (
            <View key={msg.id} style={chatStyles.message}>
              <Text style={chatStyles.messageText}>{msg.text}</Text>
              <Text style={chatStyles.messageTime}>{msg.time}</Text>
            </View>
          ))
        )}
      </ScrollView>
      <View style={chatStyles.inputRow}>
        <TextInput
          style={chatStyles.input}
          value={inputText}
          onChangeText={onChangeText}
          placeholder={home.chatPlaceholder}
          placeholderTextColor={colors.textMuted}
          returnKeyType="send"
          onSubmitEditing={onSend}
        />
        <TouchableOpacity onPress={onSend} style={chatStyles.sendButton}>
          <Text style={chatStyles.sendText}>{home.chatSend}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NavIcon({ navKey, isActive }: { navKey: string; isActive: boolean }) {
  const color = isActive ? colors.navActive : colors.navInactive;
  const size  = 22;

  const shapes: Record<string, React.ReactNode> = {
    home: (
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: 0, height: 0, borderLeftWidth: size/2, borderRightWidth: size/2, borderBottomWidth: size/2, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: color }} />
        <View style={{ width: size * 0.65, height: size * 0.45, backgroundColor: color, borderRadius: 2 }} />
      </View>
    ),
    toolbox: (
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: size * 0.5, height: size * 0.15, backgroundColor: color, borderRadius: 2, marginBottom: 2 }} />
        <View style={{ width: size, height: size * 0.6, backgroundColor: color, borderRadius: 3 }} />
      </View>
    ),
    community: (
      <View style={{ flexDirection: 'row', gap: 3 }}>
        {[0,1,2].map(i => (
          <View key={i} style={{ width: size * 0.28, height: size * 0.28, borderRadius: size, backgroundColor: color }} />
        ))}
      </View>
    ),
    account: (
      <View style={{ alignItems: 'center', gap: 2 }}>
        <View style={{ width: size * 0.4, height: size * 0.4, borderRadius: size, backgroundColor: color }} />
        <View style={{ width: size * 0.7, height: size * 0.35, borderRadius: size, backgroundColor: color }} />
      </View>
    ),
  };

  return (
    <View style={{ height: size, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
      {shapes[navKey]}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  topBar: {
    backgroundColor:   colors.topBar,
    alignItems:        'center',
    justifyContent:    'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom:     spacing.sm,
    paddingTop:        80,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  crossButton: {
    padding: spacing.sm,
  },
  body: {
    flex:              1,
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: spacing.xl,
    gap:               spacing.md,
  },
  centerSection: {
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   spacing.sm,
  },
  title: {
    fontSize:      22,
    fontFamily:    fonts.display,
    color:         colors.textPrimary,
    letterSpacing: 0.4,
    marginBottom:  spacing.xs,
  },
  connectButton: {
    backgroundColor:   colors.buttonBackground,
    borderColor:       colors.buttonBorder,
    borderWidth:       1,
    borderRadius:      radius.full,
    paddingVertical:   spacing.sm,
    paddingHorizontal: spacing.xl,
    width:             '92%',
    alignItems:        'center',
  },
  connectButtonText: {
    fontSize:      13,
    fontWeight:    '600',
    color:         colors.buttonText,
    letterSpacing: 0.2,
  },
  prayerButton: {
    paddingVertical: spacing.xs,
  },
  prayerButtonText: {
    fontSize: 13,
    color:    colors.textMuted,
  },
  bottomBar: {
    flexDirection:    'row',
    height:           110,
    backgroundColor:  colors.bottomBar,
    borderTopWidth:   StyleSheet.hairlineWidth,
    borderTopColor:   colors.divider,
    paddingBottom:    26,
  },
  navItem: {
    flex:             1,
    alignItems:       'center',
    justifyContent:   'center',
    borderRadius:     radius.md,
    marginHorizontal: 26,
    marginVertical:   14,
  },
  navLabel: {
    fontSize:  10,
    marginTop: 1,
  },

  // ── Chat overlay ──
  // position: absolute at root level — truly floats over everything.
  // top is set dynamically via onLayout on the top bar.
  chatOverlay: {
    position:          'absolute',
    left:              0,
    right:             0,
    overflow:          'hidden',
    backgroundColor:   colors.chatBackground,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.chatBorder,
    zIndex:            10,
    shadowColor:       '#000',
    shadowOffset:      { width: 0, height: 4 },
    shadowOpacity:     0.06,
    shadowRadius:      8,
    elevation:         4,
  },
});

const chatStyles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: colors.chatBackground,
  },
  title: {
    fontSize:          13,
    fontWeight:        '600',
    color:             colors.textPrimary,
    padding:           spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.chatBorder,
  },
  messageList: {
    flex: 1,
  },
  messageContent: {
    padding: spacing.md,
    gap:     spacing.sm,
  },
  empty: {
    color:     colors.textMuted,
    fontSize:  13,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  message: {
    backgroundColor: colors.chatInputBg,
    borderRadius:    radius.md,
    padding:         spacing.sm,
  },
  messageText: {
    fontSize:   14,
    color:      colors.textPrimary,
    lineHeight: 20,
  },
  messageTime: {
    fontSize:  11,
    color:     colors.textMuted,
    marginTop: 4,
  },
  inputRow: {
    flexDirection:   'row',
    alignItems:      'center',
    padding:         spacing.sm,
    borderTopWidth:  StyleSheet.hairlineWidth,
    borderTopColor:  colors.chatBorder,
    gap:             spacing.sm,
    backgroundColor: colors.chatBackground,
  },
  input: {
    flex:              1,
    backgroundColor:   colors.chatInputBg,
    borderRadius:      radius.full,
    paddingVertical:   spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize:          14,
    color:             colors.textPrimary,
  },
  sendButton: {
    backgroundColor:   colors.buttonBackground,
    borderRadius:      radius.full,
    paddingVertical:   spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sendText: {
    fontSize:   13,
    fontWeight: '600',
    color:      colors.textPrimary,
  },
});
