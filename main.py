import sys
import speech
from multiprocessing import Process
from PyQt5.QtWidgets import (QApplication, QDialog, QDialogButtonBox, QPushButton,
                             QFormLayout, QGroupBox, QLabel, QTextEdit,
                             QLineEdit, QSpinBox, QVBoxLayout)


class Dialog(QDialog):
    def __init__(self):
        super(Dialog, self).__init__()
        self.groupBox = QGroupBox("Enter Patient Info:")
        self.setWindowTitle("MedSheet")
        self.setFormParameters()

        buttonBox = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        buttonBox.accepted.connect(self.accept)
        buttonBox.rejected.connect(self.reject)

        mainLayout = QVBoxLayout()
        mainLayout.addWidget(self.groupBox)
        mainLayout.addWidget(buttonBox)
        self.setLayout(mainLayout)

    def setFormParameters(self):
        button = QPushButton('Speech', self)
        button.clicked.connect(self.onSpeechButtonClick)

        layout = QFormLayout()
        layout.addRow(QLabel("First Name:"), QLineEdit())
        layout.addRow(QLabel("Last Name"), QLineEdit())
        layout.addRow(QLabel("Age:"), QSpinBox())
        speechTest = QTextEdit()
        layout.addWidget(speechTest)
        layout.addWidget(button)
        self.groupBox.setLayout(layout)


    def onSpeechButtonClick(self):
        Process(target=speech.listen).start()


def start():
    w = 1450
    h = 300
    app = QApplication(sys.argv)
    win = Dialog()
    win.resize(w, h)
    win.show()
    sys.exit(win.exec_())


if __name__ == '__main__':
    start()
