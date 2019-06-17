ng g m core
ng g s core/services/storage --flat --skipTests
ng g s core/services/notificator --flat --skipTests
ng g s core/services/auth --flat --skipTests
ng g c components/navbar --skipTests
ng g m shared
ng g g auth/auth --skipTests
ng g s auth/token-interceptor --skipTests

