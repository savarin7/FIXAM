pipeline {
    agent any

    tools{
      nodejs('Node')
    }

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo '🧪 Running Jest tests...'
                sh 'npm test'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '🚀 Deploying backend with Docker Compose...'
                sh 'docker-compose up --build'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline succeeded. Backend deployed!'
        }
        failure {
            echo '❌ Pipeline failed. Deployment skipped.'
        }
    }
}
