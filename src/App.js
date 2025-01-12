import React, {useState, useEffect, useCallback} from "react";
import {
  Layout,
  Flex,
  Button,
  Space,
  ConfigProvider,
  Tooltip,
  theme,
  message
} from "antd";
import {CloseOutlined, MoreOutlined, PlusCircleFilled} from "@ant-design/icons";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {signInWithGoogle, signOut} from './firebase/auth';
import "antd/dist/reset.css";
import TodoCalendar from "./components/calender/index";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import SettingsModal from "./components/settings";
import {getTheme} from "./constants/defaultTheme";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const {Header, Content} = Layout;

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [formVisible, setFormVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [settingVisible, setSettingVisible] = useState(false);
  const {token} = theme.useToken();

  // 인증 상태 관리
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      displayName: null,
      email: null,
    }
  });

  // 토큰 관리
  const [authToken, setAuthToken] = useState({
    token: null,
    expirationTime: null
  });

  //로그아웃
  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      setAuth({
        isAuthenticated: false,
        user: null
      });
      setAuthToken({
        token: null,
        expirationTime: null
      });
      message.success('로그아웃되었습니다');
    } catch (error) {
      message.error('로그아웃 중 문제가 발생했습니다');
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout error:', error);
      }
    }
  }, []);

  // 토큰 갱신
  const refreshToken = useCallback(async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const newToken = await user.getIdToken(true);
        const newExpirationTime = new Date(new Date().getTime() + 3600 * 1000);
        setAuthToken({
          token: newToken,
          expirationTime: newExpirationTime
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Token refresh failed:', error);
      }
      handleLogout();
    }
  }, [handleLogout]);

  // 토큰 만료 체크
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (authToken.expirationTime && new Date() >= authToken.expirationTime) {
        refreshToken();
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [authToken, refreshToken]);

  // Firebase Auth 상태 감시
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const expirationTime = new Date(new Date().getTime() + 3600 * 1000);

          setAuth({
            isAuthenticated: true,
            user: {
              displayName: user.displayName,
              email: user.email
            }
          });

          setAuthToken({
            token: token,
            expirationTime: expirationTime
          });
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Token retrieval failed:', error);
          }
          handleLogout();
        }
      } else {
        setAuth({
          isAuthenticated: false,
          user: null
        });
        setAuthToken({
          token: null,
          expirationTime: null
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      if (result?.user) {
        setAuth({
          isAuthenticated: true,
          user: {
            displayName: result.user.displayName,
            email: result.user.email
          }
        });

        if (result.user.getIdToken) {
          const token = await result.user.getIdToken();
          const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
          setAuthToken({
            token: token,
            expirationTime: expirationTime
          });
        }

        setSettingVisible(false);
        message.success('로그인되었습니다');
      }
    } catch (error) {
      message.error('로그인에 실패했습니다. 다시 시도해주세요.');
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', error);
      }
    }
  };

  const [currentTheme, setCurrentTheme] = useState('tokyoNight');

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
  };

  // todos 저장
  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.email) {
      localStorage.setItem(`todos_${auth.user.email}`, JSON.stringify(todos));
    }
  }, [todos, auth.isAuthenticated, auth.user]);

  // todos 초기 로드
  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.email) {
      const savedTodos = localStorage.getItem(`todos_${auth.user.email}`);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }
  }, [auth.isAuthenticated, auth.user]);

  const getFilteredTodos = () => {
    const noDateTodos = todos.filter(
        (todo) => !todo.startDate && !todo.endDate
    );

    if (!selectedDate) {
      return noDateTodos;
    }

    const dateStr = selectedDate.format("YYYY-MM-DD");

    const dateTodos = todos.filter((todo) => {
      if (!todo.startDate && !todo.endDate) {
        return false;
      }

      if (todo.startDate && todo.endDate) {
        const start = dayjs(todo.startDate).startOf("day");
        const end = dayjs(todo.endDate).startOf("day");
        const current = dayjs(dateStr);
        return current.isBetween(start, end, "day", "[]");
      }

      if (todo.startDate) {
        return dayjs(todo.startDate).format("YYYY-MM-DD") === dateStr;
      }

      if (todo.endDate) {
        return dayjs(todo.endDate).format("YYYY-MM-DD") === dateStr;
      }

      return false;
    });

    return [...dateTodos, ...noDateTodos];
  };

  const handleAddTodo = (values) => {
    const newTodo = {
      id: Date.now(),
      text: values.text,
      priority: values.priority,
      startDate: values.startDate || null,
      endDate: values.endDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      userId: auth.user?.email
    };

    if (process.env.NODE_ENV === 'development') {
      console.log("New Todo:", newTodo);
    }

    setTodos((prev) => [...prev, newTodo]);
    setFormVisible(false);
  };

  const handleEditTodo = (values) => {
    setTodos((prev) =>
        prev.map((todo) =>
            todo.id === editingTodo.id
                ? {
                  ...todo,
                  text: values.text,
                  priority: values.priority,
                  startDate: values.startDate,
                  endDate: values.endDate,
                }
                : todo
        )
    );
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  return (
      <ConfigProvider theme={getTheme(currentTheme)}>
        <Layout style={{padding: "10px 5px", minHeight: "100vh"}}>
          <Header
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "transparent",
                width: "100%",
                WebkitAppRegion: "drag",
                padding: "0 20px",
                margin: "0 auto",
              }}>
            <Tooltip title="할 일 추가" placement="bottom">
              <Button
                  icon={<PlusCircleFilled style={{fontSize: '24px'}}/>}
                  onClick={() => setFormVisible(true)}
                  style={{
                    WebkitAppRegion: "no-drag",
                    color: theme.colorText,
                    background: 'transparent',
                    border: "none",
                  }}
              />
            </Tooltip>

            <Space style={{flex: 1}}/>

            <Space>
              <Tooltip title="설정" placement="bottom">
                <Button
                    type="text"
                    icon={<MoreOutlined style={{fontSize: '22px'}}/>}
                    onClick={() => setSettingVisible(true)}
                    style={{
                      WebkitAppRegion: "no-drag",
                      color: theme.colorTextSecondary,
                    }}
                />
              </Tooltip>

              <Tooltip title="닫기" placement="bottom">
                <Button
                    type="text"
                    icon={<CloseOutlined style={{fontSize: '22px'}}/>}
                    onClick={() => window.electron.window.close()}
                    style={{
                      WebkitAppRegion: "no-drag",
                      color: theme.colorTextSecondary
                    }}
                />
              </Tooltip>
            </Space>
          </Header>

          <Content style={{
            padding: "20px"
          }}>
            <Flex
                gap="large"
                vertical
                style={{
                  borderRadius: token.borderRadius,
                }}>
              <TodoCalendar
                  todos={todos}
                  selectedDate={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
              />

              <TodoList
                  todos={getFilteredTodos()}
                  selectedDate={selectedDate}
                  onToggle={(id) => {
                    setTodos((prev) =>
                        prev.map((todo) =>
                            todo.id === id
                                ? {...todo, completed: !todo.completed}
                                : todo
                        )
                    );
                  }}
                  onEdit={handleEdit}
                  onDelete={(id) => {
                    setTodos((prev) => prev.filter((todo) => todo.id !== id));
                  }}
              />
            </Flex>
          </Content>

          <TodoForm
              visible={formVisible || !!editingTodo}
              initialValues={editingTodo}
              onSubmit={editingTodo ? handleEditTodo : handleAddTodo}
              onCancel={() => {
                setFormVisible(false);
                setEditingTodo(null);
              }}
          />

          <SettingsModal
              visible={settingVisible}
              onClose={() => setSettingVisible(false)}
              auth={auth}
              onLogin={handleGoogleLogin}
              onLogout={handleLogout}
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
          />
        </Layout>
      </ConfigProvider>
  );
};

export default App;