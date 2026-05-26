import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { CategoryTag } from "../data/jobRoles";

interface TagFilterChipsProps {
  tags: CategoryTag[];
  selectedTag: CategoryTag | null;
  onSelectTag: (tag: CategoryTag | null) => void;
}

const TagFilterChips: React.FC<TagFilterChipsProps> = ({
  tags,
  selectedTag,
  onSelectTag,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tags.map((tag) => {
        const isSelected = tag === selectedTag;
        return (
          <TouchableOpacity
            key={tag}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelectTag(isSelected ? null : tag)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${tag} filter`}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {tag}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    gap: 8,
  },
  chip: {
    backgroundColor: "#1B263B",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: Colors.accent,
  },
  chipText: {
    color: "#fff",
    fontSize: 14,
  },
  chipTextSelected: {
    color: "#1B263B",
  },
});

export default TagFilterChips;
