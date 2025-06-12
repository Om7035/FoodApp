import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { createOrder } from '@/services/firebase';

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before placing an order.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        items: cartItems,
        total: getTotalPrice(),
        timestamp: new Date(),
        status: 'pending',
      };

      await createOrder(orderData);
      clearCart();
      
      Alert.alert(
        'Order Placed!',
        'Your order has been successfully placed. You can track it in the Orders tab.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(0)}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            <Minus size={16} color="#FF6B35" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            <Plus size={16} color="#FF6B35" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Trash2 size={20} color="#FF4757" />
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some delicious items from the menu!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>₹{getTotalPrice().toFixed(0)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.orderButton, isSubmitting && styles.orderButtonDisabled]}
          onPress={handleSubmitOrder}
          disabled={isSubmitting}
        >
          <Text style={styles.orderButtonText}>
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
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
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
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
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  removeButton: {
    padding: 8,
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  orderButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  orderButtonDisabled: {
    backgroundColor: '#ccc',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});