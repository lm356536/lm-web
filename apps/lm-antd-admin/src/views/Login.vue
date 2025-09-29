<template>
  <div class="login-form-wrapper">
    <!-- 默认登录信息提示 -->
    <div class="default-credentials">
      <a-alert
        type="info"
        show-icon
        message="开发环境默认账号"
        description="用户名: admin | 密码: admin123"
        :closable="false"
      />
    </div>

    <!-- 账号密码登录表单 -->
    <a-form
      v-if="activeLoginTab === 'account'"
      ref="accountFormRef"
      :model="accountLoginForm"
      :rules="accountLoginRules"
      layout="vertical"
      @finish="handleAccountLogin"
    >
      <a-form-item name="username" label="用户名/邮箱">
        <a-input
          v-model:value="accountLoginForm.username"
          placeholder="请输入用户名或邮箱"
          allow-clear
          size="large"
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password" label="密码">
        <a-input-password
          v-model:value="accountLoginForm.password"
          placeholder="请输入密码"
          visibility-toggle
          size="large"
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <div class="form-options">
        <a-checkbox v-model:checked="accountLoginForm.rememberMe"> 记住账号 </a-checkbox>
        <a href="#" class="forgot-password">忘记密码？</a>
      </div>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="loginLoading"
          block
          size="large"
        >
          登录
        </a-button>
      </a-form-item>

      <!-- 切换登录方式按钮 -->
      <div class="alternative-login-methods">
        <a-button
          type="default"
          class="switch-login-button"
          block
          size="large"
          @click="switchToPhoneLogin"
        >
          手机号登录
        </a-button>
        <a-button
          type="default"
          class="switch-login-button"
          block
          size="large"
          @click="switchToQrcodeLogin"
        >
          扫码登录
        </a-button>
      </div>

      <div v-if="loginError" class="login-error">
        {{ loginError }}
      </div>
    </a-form>

    <!-- 手机号登录表单 -->
    <div v-if="activeLoginTab === 'phone'" class="phone-login-container">
      <!-- 返回按钮 -->
      <div class="back-button">
        <a-button type="text" @click="backToAccountLogin" class="back-btn">
          <LeftOutlined /> 返回账号登录
        </a-button>
      </div>

      <a-form
        ref="phoneFormRef"
        :model="phoneLoginForm"
        :rules="phoneLoginRules"
        layout="vertical"
        @finish="handlePhoneLogin"
      >
        <a-form-item name="phone" label="手机号">
          <a-input
            v-model:value="phoneLoginForm.phone"
            placeholder="请输入手机号"
            allow-clear
            size="large"
          >
            <template #prefix>
              <MobileOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="verificationCode" label="验证码">
          <a-row :gutter="12">
            <a-col :span="16">
              <a-input
                v-model:value="phoneLoginForm.verificationCode"
                placeholder="请输入验证码"
                allow-clear
                size="large"
              >
                <template #prefix>
                  <CheckCircleOutlined />
                </template>
              </a-input>
            </a-col>
            <a-col :span="8">
              <a-button
                :disabled="countDown > 0"
                type="default"
                size="large"
                block
                @click="sendVerificationCode"
              >
                {{ countDown > 0 ? `${countDown}秒后重发` : '获取验证码' }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-button"
            :loading="loginLoading"
            block
            size="large"
          >
            登录
          </a-button>
        </a-form-item>

        <div v-if="loginError" class="login-error">
          {{ loginError }}
        </div>
      </a-form>
    </div>

    <!-- 扫码登录 -->
    <div v-if="activeLoginTab === 'qrcode'" class="qrcode-login-container">
      <!-- 返回按钮 -->
      <div class="back-button">
        <a-button type="text" @click="backToAccountLogin" class="back-btn">
          <LeftOutlined /> 返回账号登录
        </a-button>
      </div>

      <div class="qrcode-login">
        <div class="qrcode-container">
          <div class="qrcode-placeholder">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=qrcode"
              alt="登录二维码"
              class="qrcode-image"
            />
            <p class="qrcode-hint">请使用企业微信扫描二维码登录</p>
          </div>
          <a-button type="default" size="large" block class="refresh-qrcode" @click="refreshQrcode">
            刷新二维码
          </a-button>
        </div>
      </div>
    </div>

    <!-- 其他登录方式 - 只在账号密码登录页面显示 -->
    <div v-if="activeLoginTab === 'account'" class="social-login-methods">
      <div class="divider">
        <span>其他登录方式</span>
      </div>
      <div class="login-icons">
        <a-button type="text" class="login-icon-btn" title="企业微信">
          <WechatOutlined class="login-icon" />
        </a-button>
        <a-button type="text" class="login-icon-btn" title="钉钉">
          <SmileOutlined class="login-icon" />
        </a-button>
        <a-button type="text" class="login-icon-btn" title="GitHub">
          <GithubOutlined class="login-icon" />
        </a-button>
        <a-button type="text" class="login-icon-btn" title="Gitee">
          <InfoCircleOutlined class="login-icon" />
        </a-button>
      </div>
    </div>

    <div v-if="activeLoginTab === 'account'" class="register-link">
      还没有账号？<a href="#">立即注册</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import type { FormInstance } from 'ant-design-vue';
  import { store } from '@/store'; // 引入状态管理
  import {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    CheckCircleOutlined,
    WechatOutlined,
    SmileOutlined,
    GithubOutlined,
    InfoCircleOutlined,
    LeftOutlined,
  } from '@ant-design/icons-vue';
  // 路由实例
  const router = useRouter();

  // 表单引用
  const accountFormRef = ref<FormInstance>();
  const phoneFormRef = ref<FormInstance>();

  // 登录加载状态
  const loginLoading = ref(false);

  // 登录错误信息
  const loginError = ref('');

  // 当前激活的登录标签
  const activeLoginTab = ref('account');

  // 倒计时相关
  const countDown = ref(0);
  let timer: number | null = null;

  // 账号密码登录表单数据 - 设置默认用户名和密码
  const accountLoginForm = reactive({
    username: 'admin', // 默认用户名
    password: 'admin123', // 默认密码
    rememberMe: false,
  });

  // 手机号登录表单数据
  const phoneLoginForm = reactive({
    phone: '',
    verificationCode: '',
  });

  // 账号密码登录表单验证规则
  const accountLoginRules = {
    username: [
      {
        required: true,
        message: '请输入用户名或邮箱',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
      {
        min: 6,
        message: '密码长度至少为6位',
        trigger: 'blur',
      },
    ],
  };

  // 手机号登录表单验证规则
  const phoneLoginRules = {
    phone: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur',
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入有效的手机号',
        trigger: 'blur',
      },
    ],
    verificationCode: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur',
      },
      {
        len: 6,
        message: '验证码为6位数字',
        trigger: 'blur',
      },
    ],
  };

  // 处理账号密码登录
  const handleAccountLogin = async () => {
    // 重置错误信息
    loginError.value = '';

    try {
      loginLoading.value = true;

      // 模拟登录请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 这里应该是实际的登录API调用
      // 为了演示，我们直接模拟登录成功
      const mockToken = 'mock-jwt-token-' + Date.now();

      // 存储token到本地存储
      localStorage.setItem('authToken', mockToken);

      // 如果选择记住我，可以存储用户名
      if (accountLoginForm.rememberMe) {
        localStorage.setItem('rememberedUsername', accountLoginForm.username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // 更新store中的用户状态
      store.setLoggedIn(true, {
        name: accountLoginForm.username,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + accountLoginForm.username,
        permissions: ['admin'],
      });

      // 登录成功后跳转到应用首页
      router.push('/app/home');
    } catch (error) {
      // 处理登录失败
      loginError.value = error instanceof Error ? error.message : '登录失败，请检查用户名和密码';
    } finally {
      loginLoading.value = false;
    }
  };

  // 处理手机号登录
  const handlePhoneLogin = async () => {
    // 重置错误信息
    loginError.value = '';

    try {
      loginLoading.value = true;

      // 模拟登录请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 这里应该是实际的登录API调用
      // 为了演示，我们直接模拟登录成功
      const mockToken = 'mock-phone-token-' + Date.now();

      // 存储token到本地存储
      localStorage.setItem('authToken', mockToken);

      // 更新store中的用户状态
      store.setLoggedIn(true, {
        name: '手机用户',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phone',
        permissions: ['user'],
      });

      // 登录成功后跳转到应用首页
      router.push('/app/home');
    } catch (error) {
      // 处理登录失败
      loginError.value = error instanceof Error ? error.message : '登录失败，请检查手机号和验证码';
    } finally {
      loginLoading.value = false;
    }
  };

  // 发送验证码
  const sendVerificationCode = async () => {
    if (!phoneLoginForm.phone || !/^1[3-9]\d{9}$/.test(phoneLoginForm.phone)) {
      loginError.value = '请输入有效的手机号';
      return;
    }

    // 清除之前的错误信息
    loginError.value = '';

    try {
      // 模拟发送验证码请求
      await new Promise(resolve => setTimeout(resolve, 500));

      // 开始倒计时
      startCountDown();
    } catch (error) {
      loginError.value = '发送验证码失败，请稍后重试';
    }
  };

  // 开始倒计时
  const startCountDown = () => {
    countDown.value = 60;

    if (timer) {
      clearInterval(timer);
    }

    timer = window.setInterval(() => {
      if (countDown.value > 0) {
        countDown.value--;
      } else {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }
    }, 1000);
  };

  // 刷新二维码
  const refreshQrcode = () => {
    // 这里应该是实际的刷新二维码逻辑
    // 可以添加一个随机参数来模拟刷新
  };

  // 页面加载时检查是否有记住的用户名
  onMounted(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      accountLoginForm.username = rememberedUsername;
      accountLoginForm.rememberMe = true;
    }
  });

  // 切换登录方式
  const switchToPhoneLogin = () => {
    activeLoginTab.value = 'phone';
  };

  const switchToQrcodeLogin = () => {
    activeLoginTab.value = 'qrcode';
  };

  const backToAccountLogin = () => {
    activeLoginTab.value = 'account';
  };

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });
</script>

<style scoped>
  .login-form-wrapper {
    width: 100%;
  }

  /* 默认登录信息提示 */
  .default-credentials {
    margin-bottom: 24px;
    border-radius: 8px;
    overflow: hidden;
  }

  /* 表单样式增强 */
  .ant-form-item-label > label {
    color: #000000;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .ant-input,
  .ant-input-password {
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    transition: all 0.3s ease;
  }

  .ant-input:hover,
  .ant-input-password:hover {
    border-color: #40a9ff;
  }

  .ant-input:focus,
  .ant-input-password:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  /* 表单选项区域 */
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .forgot-password {
    color: #1890ff;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .forgot-password:hover {
    color: #40a9ff;
    text-decoration: underline;
  }

  /* 复选框样式 */
  .ant-checkbox-wrapper {
    color: #4d4d4d;
    font-size: 14px;
    font-weight: 500;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1890ff;
    border-color: #1890ff;
  }

  /* 登录按钮 */
  .login-button {
    height: 44px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    background-color: #1890ff;
    border: none;
    transition: all 0.3s ease;
  }

  .login-button:hover:not(:disabled) {
    background-color: #40a9ff;
  }

  .login-button:active:not(:disabled) {
    background-color: #096dd9;
  }

  /* 切换登录方式按钮 */
  .alternative-login-methods {
    margin-top: 16px;
    display: flex;
    gap: 12px;
  }

  .switch-login-button {
    flex: 1;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .switch-login-button:hover:not(:disabled) {
    border-color: #1890ff;
    color: #1890ff;
  }

  /* 返回按钮 */
  .back-button {
    margin-bottom: 20px;
  }

  .back-btn {
    font-size: 14px;
    font-weight: 500;
    color: #1890ff;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.3s ease;
  }

  .back-btn:hover {
    color: #40a9ff;
  }

  /* 手机号登录容器 */
  .phone-login-container {
    width: 100%;
  }

  /* 扫码登录容器 */
  .qrcode-login-container {
    width: 100%;
  }

  /* 登录错误信息 */
  .login-error {
    margin-top: 16px;
    padding: 12px;
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 6px;
    color: #ff4d4f;
    text-align: center;
    font-size: 14px;
  }

  /* 二维码登录样式 */
  .qrcode-login {
    padding: 20px 0;
  }

  .qrcode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .qrcode-placeholder {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 20px;
    background: white;
  }

  .qrcode-image {
    width: 140px;
    height: 140px;
    margin-bottom: 16px;
    border-radius: 4px;
  }

  .qrcode-hint {
    margin: 0;
    font-size: 14px;
    color: #000000;
    font-weight: 500;
    text-align: center;
  }

  .refresh-qrcode {
    width: 200px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .refresh-qrcode:hover {
    background-color: #f5f5f5;
  }

  /* 其他登录方式 */
  .social-login-methods {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;
  }

  .divider {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  .divider::before,
  .divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background-color: #f0f0f0;
  }

  .divider::before {
    left: 0;
  }

  .divider::after {
    right: 0;
  }

  .divider span {
    padding: 0 16px;
    background-color: #fff;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
  }

  .login-icons {
    display: flex;
    justify-content: center;
    gap: 24px;
  }

  .login-icon-btn {
    font-size: 24px;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .login-icon-btn:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  .login-icon {
    font-size: 24px;
    color: #000000;
    transition: color 0.3s ease;
  }

  .login-icon-btn:hover .login-icon {
    color: #1890ff;
    transform: scale(1.1);
  }

  /* 注册链接 */
  .register-link {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #000000;
    font-weight: 500;
  }

  .register-link a {
    color: #1890ff;
    margin-left: 4px;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .register-link a:hover {
    color: #40a9ff;
    text-decoration: underline;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .login-form-wrapper {
      padding: 0;
    }

    .default-credentials {
      margin-bottom: 20px;
    }

    .form-options {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .alternative-login-methods {
      gap: 8px;
    }

    .switch-login-button,
    .login-button {
      height: 40px;
      font-size: 14px;
    }

    .login-icons {
      gap: 16px;
    }

    .login-icon-btn {
      font-size: 20px;
      padding: 6px;
    }

    .login-icon {
      font-size: 20px;
    }

    .register-link {
      margin-top: 16px;
    }

    .divider::before,
    .divider::after {
      width: 20%;
    }
  }
</style>
