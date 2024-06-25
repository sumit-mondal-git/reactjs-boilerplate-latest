import { useLocation, useNavigate } from 'react-router-dom';
import { removeHtmlTags } from '../../pages/channel/utils';
import { routeNames } from '../../router/constants';
import importStatements from './importStatements';
import { useDispatch } from 'react-redux';
import { getSessionDetail, toggleLoadingBar } from '../../Store/actions';
import { getLocalStorage, isEligibleForSpeciality, setLocalStorage } from '../../common/common';
import { useIsMultidaySession } from '../../Queries/QueryHooks/multiday.hook';
import { useRef } from 'react';
import { checkUserAlreadyExists, loginToDoctube } from '../../Store/actions/doctube.action';
import { useDoctubeChannelDetails } from '../../Queries/QueryHooks/doctube.hook';
import { toast } from 'react-toastify';

const useRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const convertToSlug = (Text) => {
    return Text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/[^\w\s]/gi, '-');
  };

  const findImportStatement = (path) => {
    if (!path) return null;
    return importStatements.find(
      (statement) => statement.path === path || statement.path === `/${path}`
    );
  };
  const onSuccess = (res) => {
    console.log('ON_SUCCESS', res);
    let { channel_name, about, avatar, cover, consult_link } = res;

    let stateToPass = {
      state_data: { channel_name, about, avatar, cover, consult_link }
    };

    if (res?.created_by == 1) {
      getLocalStorage('doctube_access_token', false) &&
        redirectTo(routeNames.doctube.dashboard, '', '', '', stateToPass, true);
    } else {
      getLocalStorage('doctube_access_token', false) &&
        redirectTo(routeNames.doctube.profile, '', '', '', stateToPass, true);
    }
  };
  const onError = (e) => {
    console.log('ON_ERROR', e);
    // navigate('/', { replace: true });
  };
  const { data: channel, isLoading, refetch } = useDoctubeChannelDetails(false, onSuccess, onError);
  const redirect = (moduleName, id = '', name = '', extra = '', state = {}, replace) => {
    const sessionRoutes = [
      routeNames.sessions.detail,
      routeNames.sessions.waitingRoom,
      routeNames.sessions.live
    ];
    const urlParams = `${moduleName}/${id}/${convertToSlug(removeHtmlTags(name))}${
      extra ? `?${extra}` : ''
    }`;
    const url = `${moduleName}${extra ? `?${extra}` : ''}`;
    const doNavigate = () => {
      const stateToPass = {
        replace,
        state: { ...state, ...location }
      };
      navigate(
        moduleName?.startsWith('/') ? (id ? urlParams : url) : id ? `/${urlParams}` : `/${url}`,
        stateToPass
      );
      //dispatch(toggleLoadingBar(false));
    };

    if (sessionRoutes.includes(moduleName) || sessionRoutes.includes(`/${moduleName}`)) {
      dispatch(getSessionDetail(id, () => doNavigate()));
    } else if (
      routeNames.doctube.landing === moduleName ||
      routeNames.doctube.landing === `/${moduleName}`
    ) {
      dispatch(
        checkUserAlreadyExists((user) => {
          if (user) {
            let { id, smtoken } = user;
            dispatch(
              loginToDoctube(id, smtoken, (res) => {
                if (res) {
                  console.log('LOGIN_TO_DOCTUBE', res?.refresh_token);
                  setLocalStorage('doctube_access_token', res?.token);
                  setLocalStorage('doctube_refresh_token', res?.refresh_token);
                  console.log(
                    'DOCTUBE_ACCESS_TOKEN',
                    getLocalStorage('doctube_access_token', false)
                  );
                  refetch();
                } else {
                  //dispatch(toggleLoadingBar(false));
                  toast.error('Something went wrong');
                }
              })
            );
          } else {
            navigate(routeNames.doctube.landing, {
              state: {
                isStatic: 'true'
              }
            });
            //dispatch(toggleLoadingBar(false));
          }
        })
      );
    } else {
      doNavigate();
    }
  };
  const redirectTo = (moduleName, id = '', name = '', extra = '', state = {}, replace = false) => {
    dispatch(toggleLoadingBar(true));

    try {
      let importStatement = findImportStatement(moduleName);
      if (importStatement) {
        const isSpecialityEligible = isEligibleForSpeciality(getLocalStorage('user', '{}'));
        let statement = isSpecialityEligible
          ? importStatement.statement()
          : importStatement?.oldStatement
          ? importStatement?.oldStatement()
          : importStatement?.statement();
        statement
          .then((module) => {
            redirect(moduleName, id, name, extra, state, replace);
          })
          .catch((error) => {
            redirect(moduleName, id, name, extra, state, replace);
          });
      } else {
        redirect(moduleName, id, name, extra, state, replace);
      }
    } catch (error) {
      redirect(moduleName, id, name, extra, state, replace);
    }
  };
  return { redirectTo };
};

export default useRedirect;
