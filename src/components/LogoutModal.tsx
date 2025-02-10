import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirmClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you want to logout?</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              marginTop: -6,
              marginBottom: 6,
            }}
          >
            You will be redirected to the login screen
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <TouchableOpacity onPress={onClose} style={styles.noButton}>
              <Text style={styles.buttonText}>No, cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirmClose} style={styles.yesButton}>
              <Text style={styles.buttonText}>Yes, Log me out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 15,
  },
  yesButton: {
    backgroundColor: "#0066CC",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  noButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LogoutModal;
