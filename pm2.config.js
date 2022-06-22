module.exports = {
  apps: [
    {
      name: 'nest-template', // pm2 name
      script: './dist/main.js', // 앱 실행 스크립트
      instances: 0, // 코어 수 만큼 프로세스 생성
      exec_mode: 'cluster_mode', // fork, cluster 모드 중 선택
      merge_logs: true, // 각 클러스터에서 생성되는 로그를 한 파일로 합칠지 여부
      autorestart: true, // 프로세스 실패 시 자동으로 재시작 여부
      watch: false, // 파일이 변경되었을 때 재시작 여부
      // max_memory_resatrt: '512M', // 프로그램의 메모리가 일정 크기 이상이 되면 재시작
      env_development: {
        // 개발 환경 설정
        NODE_ENV: 'development',
        MYSQL_HOST: '127.0.0.1',
        MYSQL_PORT: '3306',
        MYSQL_USER: 'root',
        MYSQL_PW: '1234',
        MYSQL_DB: 'sample',
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: '6379',
      },
      env_production: {
        // 배포 환경 설정. 스크립트에서 --env production 옵션으로 지정.
        NODE_ENV: 'production',
        MYSQL_HOST: '127.0.0.1',
        MYSQL_PORT: '3306',
        MYSQL_USER: 'root',
        MYSQL_PW: '1234',
        MYSQL_DB: 'sample',
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: '6379',
      },
    },
  ],
};
