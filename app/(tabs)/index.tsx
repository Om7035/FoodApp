import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Plus, Search } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { getMenuItems, type MenuItem } from '@/services/firebase';

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (err) {
      setError('Failed to load menu items. Please try again.');
      console.error('Error loading menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>
            ₹{typeof item.price === 'number' ? item.price.toFixed(0) : 'N/A'}
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Plus size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading delicious food...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadMenuItems}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#FF6B35" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    padding: 8,
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  itemDetails: {
    padding: 16,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF4757',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});