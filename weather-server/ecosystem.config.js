module.exports = {
  apps:[
    {
      name: "weather-server",
      script: './dist/main.js', 
      instances: 3,
      exec_mode: 'cluster', 
      max_memory_restart: '500M', // 프로세스의 메모리가 N MB에 도달하면 reload 실행
      
      ignore_watch: ['node_modules'], // 반대로 해당폴더의 파일변경은 무시
      instance_var: 'INSTANCE_ID',
      // exp_backoff_restart_delay: 100,
      // wait_ready: true,      
      // listen_timeout: 10000, 
      // kill_timeout: 5000   
    }
  ]
}