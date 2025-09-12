import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from './ThemedView';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

interface PostCardProps {
  username: string;
  imageUrl?: string;
  timestamp: string;
  banner: string;
  content: string;
  contentImageUrl?: string;
  likes: number;
  onLike: () => void;
  canDelete: () => Promise<boolean>;
  onDelete: () => void;
  // onComment?: (postId: string) => void;
  // onShare?: (postId: string) => void;
  // onBookmark?: (postId: string) => void;
  // onOptions?: (postId: string) => void;
}

export function PostCard({
  username,
  imageUrl,
  timestamp,
  banner,
  content,
  contentImageUrl,
  likes,
  onLike,
  canDelete,
  onDelete,
}: PostCardProps) {
  const [isLike, setIsLike] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleOptions = async () => {
    setOptionsVisible(true);
    try {
      const can = await canDelete();
      setShowDelete(!!can);
    } catch {
      setShowDelete(false);
    }
  };

  const handleDelete = () => {
    setOptionsVisible(false);
    onDelete();
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          borderColor: banner + '50',
          borderWidth: 1,
        },
      ]}
      backgroundType="surface"
    >
      <PostHeader
        name={username}
        imageUrl={imageUrl}
        banner={banner}
        timestamp={timestamp}
        onOptions={handleOptions}
      />
      <PostContent content={content} imageUrl={contentImageUrl} />
      <PostFooter
        likes={likes}
        isLike={isLike}
        onLike={() => { onLike(); setIsLike(true); }}
      />
      <Modal
        visible={optionsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setOptionsVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
          activeOpacity={1}
          onPressOut={() => setOptionsVisible(false)}
        >
          <ThemedView backgroundType="surface" style={{ position: 'absolute', right: 20, top: 60, borderRadius: 10, padding: 10, minWidth: 120, elevation: 5 }}>
            {showDelete ? (
              <TouchableOpacity onPress={handleDelete} style={{ paddingVertical: 10 }}>
                <ThemedText variant='button' colorType='red'>Delete</ThemedText>
              </TouchableOpacity>
            ) : (
              <View style={{ paddingVertical: 10 }}>
                <ThemedText variant='body' colorType='textSecondary'>no options available</ThemedText>
              </View>
            )}
            {/* Add more options here if needed */}
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 7.5,
    marginVertical: 7.5,
    overflow: 'hidden',
  },
}); 