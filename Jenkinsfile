pipeline {
    agent any

    tools {
        nodejs('Node')
    }

    environment {
        NODE_ENV = 'production'
        CI = 'true'   // Ensures Jest runs in non-interactive CI mode
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
                    echo '📦 Installing backend dependencies using npm ci...'
                    sh 'npm ci'   // Better for CI than npm install
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo '🧪 Running Jest tests in CI mode...'
                dir('backend') {
                    sh '''
                        npx jest \
                          --config=./jest.config.js \
                          --ci \
                          --runInBand \
                          --detectOpenHandles
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '🚀 Deploying backend with Docker Compose...'
                dir('backend') {
                    sh 'docker-compose up --build -d'
                }
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
        always {
            echo '🧹 Cleaning workspace...'
            cleanWs()
        }
    }
}
