import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Clock, CircleCheck as CheckCircle, Package } from 'lucide-react-native';
import { getOrders, type Order } from '@/services/firebase';

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      setError('Failed to load orders. Please try again.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color="#FF6B35" />;
      case 'preparing':
        return <Package size={20} color="#4ECDC4" />;
      case 'completed':
        return <CheckCircle size={20} color="#26DE81" />;
      default:
        return <Clock size={20} color="#666" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF6B35';
      case 'preparing':
        return '#4ECDC4';
      case 'completed':
        return '#26DE81';
      default:
        return '#666';
    }
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>Order #{item.id.slice(-6)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.orderDate}>
        {new Date(item.timestamp).toLocaleDateString()} at{' '}
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
      
      <View style={styles.orderItems}>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.orderItemText}>
            {orderItem.quantity}x {orderItem.name}
          </Text>
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>₹{item.total.toFixed(0)}</Text>
        <Text style={styles.itemCount}>{item.items.length} items</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading your orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadOrders}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Package size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Your order history will appear here</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>
      
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
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
  ordersList: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
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